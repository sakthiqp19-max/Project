import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setReply } from "../store/chatSlice";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

// responsive scaling
const scale = (size: number) => (width / 375) * size;

export default function ReplyPreview() {
  const dispatch = useDispatch();

  const replyMessage = useSelector(
    (state: RootState) => state.chat.replyMessage
  );

  if (!replyMessage) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Replying to</Text>

      <Text numberOfLines={1} style={styles.messageText}>
        {replyMessage.text}
      </Text>

      <TouchableOpacity onPress={() => dispatch(setReply(undefined))}>
        <Text style={styles.cancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scale(10),
    backgroundColor: "#fff",
    borderTopWidth: scale(1),
    borderColor: COLORS.border,
    borderLeftWidth: scale(3),
    borderLeftColor: COLORS.primary,
  },

  title: {
    fontWeight: "600",
    fontSize: scale(14),
    marginBottom: scale(4),
  },

  messageText: {
    fontSize: scale(13),
  },

  cancel: {
    color: "red",
    marginTop: scale(4),
    fontSize: scale(13),
  },
});