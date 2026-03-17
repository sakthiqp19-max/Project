import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

// responsive scale function
const scale = (size: number) => (width / 375) * size;

interface Props {
  onRate: (rating: number) => void;
}

export default function StarRating({ onRate }: Props) {

  const [rating, setRating] = useState(0);

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable
          key={star}
          style={styles.starButton}
          onPress={() => {
            setRating(star);
            onRate(star);
          }}
        >
          <Text style={styles.star}>
            {star <= rating ? "⭐" : "☆"}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    marginTop: scale(10),
  },

  starButton: {
    paddingHorizontal: scale(4),
  },

  star: {
    fontSize: scale(28),
  },

});