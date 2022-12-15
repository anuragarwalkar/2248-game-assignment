import React from "react";
import { StyleSheet, View } from "react-native";
import Grid from "./src/components/Grid";

export default function App() {
  return (
    <View style={styles.container}>
      <Grid />
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
