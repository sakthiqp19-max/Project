import { Gesture } from "react-native-gesture-handler";
import {
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

export const useSwipeReply = (onReply: () => void) => {
  const translateX = useSharedValue(0);

const gesture = Gesture.Pan()
  .activeOffsetX([-20, 20]) // only activate if horizontal
  .failOffsetY([-20, 20])   // fail if vertical scroll
  .onUpdate((event) => {
    translateX.value = Math.max(0, event.translationX);
  })
  .onEnd(() => {
    if (translateX.value > 80) {
      runOnJS(onReply)();
    }
    translateX.value = withSpring(0);
  });

  return { gesture, translateX };
};