import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { gridStyles } from "../Grid/styles";

function GridItem({ id, value, color: backgroundColor, index }) {
  const boxStyle = { ...gridStyles.box, backgroundColor, position: "relative" };

  return (
    <TouchableWithoutFeedback onPress={() => {
      console.log(index);
    }}>
      <View key={id} style={boxStyle}>
        <Text style={styles.text}>{value}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({ text: { color: "white", fontSize: 40 } });

export default GridItem;
