import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  LayoutAnimation,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

// responsive scale function
const scale = (size: number) => (width / 375) * size;

interface Props {
  onSubmit: (rating: number) => void;
}

export default function RatingOverlay({ onSubmit }: Props) {
  const [rating, setRating] = useState(0);

  const handleRate = (value: number) => {
    LayoutAnimation.easeInEaseOut();
    setRating(value);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.thankyou}>Thank You 🙏</Text>

        <Text style={styles.subtitle}>
          Please rate your experience
        </Text>

        {/* Stars */}
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Pressable key={i} onPress={() => handleRate(i)}>
              <Text style={styles.star}>
                {i <= rating ? "⭐" : "☆"}
              </Text>
            </Pressable>
          ))}
        </View>

        {rating > 0 && (
          <Pressable
            style={styles.submit}
            onPress={() => onSubmit(rating)}
          >
            <Text style={styles.submitText}>Submit Rating</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: width * 0.75,
    backgroundColor: "white",
    borderRadius: scale(16),
    padding: scale(20),
    alignItems: "center",
  },

  thankyou: {
    fontSize: scale(20),
    fontWeight: "600",
    marginBottom: scale(10),
  },

  subtitle: {
    marginBottom: scale(20),
    fontSize: scale(14),
  },

  starRow: {
    flexDirection: "row",
  },

  star: {
    fontSize: scale(32),
    marginHorizontal: scale(4),
  },

  submit: {
    marginTop: scale(20),
    backgroundColor: "#4CAF50",
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(8),
  },

  submitText: {
    color: "white",
    fontSize: scale(14),
  },
});