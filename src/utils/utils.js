import { Dimensions } from "react-native";

export const getCurrentWidth = () => Dimensions.get("window").width;

export const getCurrentHeight = () => Dimensions.get("window").height;

export const getDimenssions = () => Dimensions.get("window");

const DEFAULT_HIT_SLOP = 25;

export default function getDotIndex(
  gestureCoordinate,
  dots,
  hitSlop = DEFAULT_HIT_SLOP
) {
  let {x, y} = gestureCoordinate;
  for (let i = 0; i < dots.length; i++) {
    let {x: dotX, y: dotY} = dots[i];
    if (
      dotX + hitSlop >= x &&
      dotX - hitSlop <= x &&
      dotY + hitSlop >= y &&
      dotY - hitSlop <= y
    ) {
      return i;
    }
  }
}
