import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setReply } from '../store/chatSlice';
import { useSwipeReply } from '../gestures/swipeReplyGesture';
import { Message } from '../types/message';
import EmojiReactionBar from './EmojiReactionBar';
import { RootState } from '../store';
import { COLORS } from '../constants/theme';
import AIMessageFeedback from './AIMessageFeedback';

const { width } = Dimensions.get('window');

// responsive scaling function
const scale = (size: number) => (width / 375) * size;

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const dispatch = useDispatch();
  const [showReaction, setShowReaction] = useState(false);

  const messages = useSelector((state: RootState) => state.chat.messages);

  const repliedMessage = messages.find(m => m.id === message.replyTo);

  const { gesture, translateX } = useSwipeReply(() =>
    dispatch(setReply(message)),
  );

  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const REPLY_THRESHOLD = scale(40);

  const replyIconStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > REPLY_THRESHOLD ? 1 : 0,
    transform: [{ scale: translateX.value > REPLY_THRESHOLD ? 1 : 0.5 }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.wrapper}>
        <Animated.View
          style={[
            bubbleStyle,
            styles.row,
            {
              justifyContent:
                message.sender === 'user' ? 'flex-end' : 'flex-start',
            },
          ]}
        >
          {/* Reply arrow */}
          <Animated.Text style={[replyIconStyle, styles.replyIcon]}>
            ↩️
          </Animated.Text>

          <Pressable onLongPress={() => setShowReaction(true)}>
            <View
              style={[
                styles.bubble,
                {
                  backgroundColor:
                    message.sender === 'user'
                      ? COLORS.userBubble
                      : COLORS.astrologerBubble,
                },
              ]}
            >
              {/* Reply preview */}
              {repliedMessage && (
                <View style={styles.replyPreview}>
                  <Text style={styles.replyText} numberOfLines={1}>
                    {repliedMessage.text}
                  </Text>
                </View>
              )}

              <Text style={styles.messageText}>{message.text}</Text>

              {message.reaction && (
                <Text style={styles.reaction}>{message.reaction}</Text>
              )}

              <View style={styles.feedbackContainer}>
                {message.sender === 'ai_astrologer' && <AIMessageFeedback />}
              </View>
            </View>
          </Pressable>
        </Animated.View>

        {showReaction && (
          <EmojiReactionBar
            messageId={message.id}
            onSelect={() => setShowReaction(false)}
          />
        )}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  row: {
    marginVertical: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
  },

  replyIcon: {
    fontSize: scale(20),
    marginRight: scale(6),
  },

  bubble: {
    maxWidth: '85%',
    borderRadius: scale(16),
    padding: scale(12),
    marginVertical: scale(6),

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: scale(6),
    elevation: 2,
  },

  replyPreview: {
    borderLeftWidth: scale(3),
    borderLeftColor: '#4CAF50',
    paddingLeft: scale(8),
    marginBottom: scale(6),
    alignSelf: 'flex-start',
    maxWidth: '90%',
  },

  replyText: {
    fontSize: scale(12),
    color: '#555',
  },

  messageText: {
    fontSize: scale(14),
  },

  reaction: {
    marginTop: scale(6),
    fontSize: scale(16),
  },

  feedbackContainer: {
    marginTop: scale(6),
  },
});
