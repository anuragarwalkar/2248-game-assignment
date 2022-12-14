import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import gridGenerator from "./src/gridGenerator";

const width = Dimensions.get("window").width;

export default function App() {
  const [grid] = useState(gridGenerator.generate());

  return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {grid.map((i) =>
            i.map((j) => (
              <View
                key={j.key}
                style={{ ...styles.box, backgroundColor: j.color }}
              >
                <Text style={{ color: "white", fontSize: 50 }}>{j.value}</Text>
              </View>
            ))
          )}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE7C3',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  innerContainer: {
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: width / 5,
    height: width / 5,
    borderRadius: 30,
    margin: width * 0.02,
  },
});
