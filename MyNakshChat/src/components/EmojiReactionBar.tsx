import React from "react";
import {
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
} from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { addReaction } from "../store/chatSlice";

const { width } = Dimensions.get("window");

// responsive scale function
const scale = (size: number) => (width / 375) * size;

const emojis = ["🙏", "✨", "🌙"];

interface Props {
  messageId: string;
  onSelect: () => void;
}

export default function EmojiReactionBar({ messageId, onSelect }: Props) {

  const dispatch = useDispatch();

  const handleReaction = (emoji: string) => {
    dispatch(addReaction({ id: messageId, emoji }));
    onSelect(); // close emoji bar
  };

  return (
    <Animated.View
      layout={LinearTransition.springify()}
      style={styles.container}
    >
      {emojis.map((emoji) => (
        <Pressable
          key={emoji}
          onPress={() => handleReaction(emoji)}
          style={styles.emojiButton}
        >
          <Text style={styles.emoji}>{emoji}</Text>
        </Pressable>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: scale(8),
    borderRadius: scale(20),
    marginTop: scale(6),
    alignSelf: "flex-start",
  },

  emojiButton: {
    paddingHorizontal: scale(6),
  },

  emoji: {
    fontSize: scale(20),
  },

});