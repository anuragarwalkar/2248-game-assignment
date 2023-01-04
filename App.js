import { StyleSheet, View, Text, Button } from "react-native";
import React from "react";
import Main from "./src/components/Main";

function App() {
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE7C3",
    height: "100%",
  },
});

export default App;
