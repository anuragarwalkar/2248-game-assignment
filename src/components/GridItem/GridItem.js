import { StyleSheet, View, Text } from "react-native";
import { gridStyles } from "../Grid/styles";

function GridItem({ id, value, color }) {

  const boxStyle =  { ...gridStyles.box, backgroundColor: color };

  return (
    <View key={id} style={boxStyle}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({text: { color: "white", fontSize: 40 }})

export default GridItem;
