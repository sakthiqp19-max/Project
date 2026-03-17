import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import MessageBubble from "../components/MessageBubble";
import ReplyPreview from "../components/ReplyPreview";
import RatingOverlay from "../components/RatingOverlay";
import { COLORS } from "../constants/theme";
import { addMessage, clearChat } from "../store/chatSlice";

const { width } = Dimensions.get("window");

// responsive scale function
const scale = (size: number) => (width / 375) * size;

export default function ChatScreen() {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch();

  const [showRating, setShowRating] = useState(false);
  const [text, setText] = useState("");

  const flatListRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;

    dispatch(
      addMessage({
        id: Date.now().toString(),
        text,
        sender: "user",
        timestamp: Date.now(),
        type: "",
      })
    );

    setText("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleEndChat = () => {
    LayoutAnimation.easeInEaseOut();
    setShowRating(true);
  };

  const handleSubmit = (rating: number) => {
    dispatch(clearChat());

    Alert.alert("Thank You!", `Rating captured: ${rating} ⭐`, [
      {
        text: "OK",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔮 MyNaksh Astrology</Text>

        <TouchableOpacity onPress={handleEndChat} style={styles.endChat}>
          <Text style={styles.endChatText}>End Chat</Text>
        </TouchableOpacity>
      </View>

      {/* CHAT MESSAGES */}
      <FlatList
        ref={flatListRef}
        style={styles.list}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        removeClippedSubviews
        initialNumToRender={15}
        windowSize={10}
      />

      {/* REPLY PREVIEW */}
      <ReplyPreview />

      {/* MESSAGE INPUT */}
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          style={styles.input}
        />

        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>

      {showRating && <RatingOverlay onSubmit={handleSubmit} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: scale(60),
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  headerTitle: {
    color: "#fff",
    fontSize: scale(18),
    fontWeight: "600",
  },

  endChat: {
    position: "absolute",
    right: scale(15),
    top: scale(18),
  },

  endChatText: {
    color: "#fff",
    fontSize: scale(14),
  },

  list: {
    flex: 1,
  },

  listContent: {
    padding: scale(10),
    paddingBottom: scale(20),
  },

  inputContainer: {
    flexDirection: "row",
    padding: scale(10),
    borderTopWidth: scale(1),
    borderColor: "#eee",
    backgroundColor: "#fff",
    alignItems: "center",
  },

  input: {
    flex: 1,
    padding: scale(10),
    backgroundColor: "#f3f3f3",
    borderRadius: scale(20),
    fontSize: scale(14),
  },

  sendButton: {
    marginLeft: scale(10),
    justifyContent: "center",
  },

  sendText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: scale(14),
  },
});