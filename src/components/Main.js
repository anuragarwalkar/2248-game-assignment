import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { GridContext } from "../context";
import useGridGenerator from "../hooks/useGridGenerator";
import { getCurrentHeight } from "../utils/utils";
import Grid from "./Grid/Grid";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const height = getCurrentHeight();

function Main() {
  const { grid, mappedGridIndex, setGridData, resetGrid } = useGridGenerator();
  const [score, setScore] = useState(0);

  const onRestart = () => {
    setScore(0);
    resetGrid();
  }

  return (
    <GridContext.Provider
      value={{
        grid,
        mappedGridIndex,
        setGridData,
        score,
        setScore,
        setGridData,
      }}
    >
      <View style={styles.container}>
        <View style={styles.chip}>
          <Text style={styles.text}>{score}</Text>
        </View>
      
        <TouchableWithoutFeedback onPress={onRestart} >
          <View style={styles.chip}>
              <MaterialCommunityIcons name="restart" size={30} color="white" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Grid />
    </GridContext.Provider>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "purple",
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  container: {
    marginTop: height * 0.15,
    padding: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: { fontSize: 27, color: "white" },
});

export default Main;
