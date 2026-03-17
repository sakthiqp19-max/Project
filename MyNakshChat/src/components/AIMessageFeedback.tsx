import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

// responsive scale
const scale = (size: number) => (width / 375) * size;

export default function AIMessageFeedback() {
  const [reason, setReason] = useState("");
  const [disliked, setDisliked] = useState(false);
  const [liked, setLiked] = useState(false);

  const reasons = ["Inaccurate", "Too Vague", "Too Long"];

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  const handleLike = () => {
    if (disliked) return;
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) return;

    if (disliked) {
      height.value = withTiming(0, { duration: 250 });
      opacity.value = withTiming(0, { duration: 250 });
      setDisliked(false);
      setReason("");
    } else {
      setDisliked(true);
      height.value = withTiming(scale(45), { duration: 250 });
      opacity.value = withTiming(1, { duration: 250 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Like / Dislike */}
      <View style={styles.row}>
        <TouchableOpacity disabled={disliked} onPress={handleLike}>
          <Text style={[styles.icon, { opacity: disliked ? 0.4 : 1 }]}>
            👍
          </Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={liked} onPress={handleDislike}>
          <Text style={[styles.icon, { opacity: liked ? 0.4 : 1 }]}>
            👎
          </Text>
        </TouchableOpacity>
      </View>

      {/* Animated Chips */}
      <Animated.View style={[styles.chipContainer, animatedStyle]}>
        {reasons.map((r) => (
          <Pressable key={r} onPress={() => setReason(r)}>
            <Text
              style={[
                styles.chip,
                { backgroundColor: reason === r ? "#ddd" : "#f3f3f3" },
              ]}
            >
              {r}
            </Text>
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(6),
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    fontSize: scale(20),
    marginRight: scale(14),
  },

  chipContainer: {
    flexDirection: "row",
    overflow: "hidden",
    marginTop: scale(6),
  },

  chip: {
    margin: scale(6),
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(16),
    fontSize: scale(12),
  },
});