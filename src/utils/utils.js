import { Dimensions } from "react-native";

export const getCurrentWidth = () => Dimensions.get("window").width;

export const getCurrentHeight = () => Dimensions.get("window").height;