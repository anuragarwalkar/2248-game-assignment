import { StyleSheet } from "react-native";
import { getCurrentHeight } from "../utils";

const height = getCurrentHeight();

export const gridStyles = StyleSheet.create({
  innerContainer: {
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    padding: 5,
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    flex: 1,
    margin: 15,
    height: height * 0.08,
  },
});
