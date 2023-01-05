import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { GridContext } from "../context";
import { getCurrentHeight } from "../utils/utils";
import Grid from "./Grid/Grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Congratulations from "./Contratulations/Congratulations";
import useCustomContext from "../hooks/useCustomContext";

const height = getCurrentHeight();

function Main() {
  const { provider, onRestart, showModal, onHideModal, score } =
    useCustomContext();
    
  return (
    <GridContext.Provider value={provider}>
      <View style={styles.container}>
        <View style={styles.chip}>
          <Text style={styles.text}>{score}</Text>
        </View>
        <TouchableWithoutFeedback onPress={onRestart}>
          <View style={styles.chip}>
            <MaterialCommunityIcons name="restart" size={30} color="white" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Grid />
      {showModal && <Congratulations
        show={showModal}
        restart={onRestart}
        hideModal={onHideModal}
      />}
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
    borderRadius: 10,
  },
  container: {
    top: height * 0.15,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: { fontSize: 27, color: "white" },
});

export default Main;
