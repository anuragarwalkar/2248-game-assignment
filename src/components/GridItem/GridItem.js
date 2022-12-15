import { StyleSheet, View } from "react-native";

function GridItem({ key, value, color }) {

  const boxStyle =  { ...gridStyles.box, backgroundColor: color };

  return (
    <View key={key} style={boxStyle}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({text: { color: "white", fontSize: 40 }})

export default GridItem;
