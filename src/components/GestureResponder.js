import React from "react";
import { StyleSheet, View } from "react-native";
import GestureRecorder from "./src/components/GestureRecorder";

function GestureResponder() {

  return (
    <View style={styles.container}>
        <GestureRecorder/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE7C3",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

export default GestureResponder;
