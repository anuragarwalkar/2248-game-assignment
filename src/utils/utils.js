import { Dimensions } from "react-native";

export const getDimenssions = () => Dimensions.get("window");

export const getCurrentWidth = () => getDimenssions().width;

export const getCurrentHeight = () => getDimenssions().height;

const DEFAULT_HIT_SLOP = 20;

export function getGridIndex(
  gestureCoordinate,
  dots,
  hitSlop = DEFAULT_HIT_SLOP
) {
  let {x, y} = gestureCoordinate;
  for (let i = 0; i < dots.length; i++) {
    let {x1: dotX, y1: dotY} = dots[i];
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

export function getIsValidPattern(anchorCoordinate, focusCoordinate) {
  const {x:aX, y:aY} = anchorCoordinate; 
  const {x:fX, y:fY} = focusCoordinate; 

  // Horizontal check top -> bottom
  if((aX + 1) === fX && aY === fY) {
    return true;
  }

   // Horizontal check bottom -> top
  if((aX - 1) === fX && aY === fY) {
    return true;
  }

  // Vertical check top -> bottom
  if((aY + 1) === fY && aX === fX) {
    return true;
  }

  // Vertical check bottom -> top
  if((aY - 1) === fY && aX === fX) {
    return true;
  }

  //Digonal checks 
  if((aX + 1) === fX && (aY + 1) === fY) {
    return true;
  }

  if((aX - 1) === fX && (aY - 1) === fY) {
    return true;
  }

  if((aX - 1) === fX && (aY + 1) === fY) {
    return true;
  }

  if((fX - 1) === aX && (fY + 1) === aY) {
    return true;
  }

  return false;
}
