import { Rect, Svg, Text } from "react-native-svg";

function GridItem({ item: { x, y, color, value } }) {
  return (
    <Svg>
      <Rect x={x} y={y} rx={20} width={70} height={70} fill={color} />
      <Text
        x={x + 35}
        y={y + 50}
        fill="white"
        fontSize="42"
        textAnchor="middle"
      >
        {value}
      </Text>
    </Svg>
  );
}

export default GridItem;
