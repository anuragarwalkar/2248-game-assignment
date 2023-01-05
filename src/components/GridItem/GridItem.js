import { Rect, Svg, Text } from "react-native-svg";

function GridItem({ item: { x, y, color, value } }) {
  return (
    <Svg>
      <Rect x={x} y={y} rx={20} width={70} height={70} fill={color} />
      <Text
        x={x + (value.toString().length > 2 ? 35 : 35)}
        y={y + (value.toString().length > 2 ? 45 : 50)}
        fill="white"
        fontSize={value.toString().length > 2 ? 24 : 42}
        textAnchor="middle"
        textLength={3}
      >
        {value}
      </Text>
    </Svg>
  );
}

export default GridItem;
