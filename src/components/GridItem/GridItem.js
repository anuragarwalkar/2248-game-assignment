import { View } from "react-native";

function GridItem({ key, value, color }) {
  return (
    <View key={key} style={{ ...gridStyles.box, backgroundColor: color }}>
      <Text style={{ color: "white", fontSize: 40 }}>{value}</Text>
    </View>
  );
}

export default GridItem;
