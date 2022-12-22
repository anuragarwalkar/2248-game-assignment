import { Line } from "react-native-svg";

function Pattern({items, mappedGridIndex, grid}) {
  const PatternGenerator = () => {
   return items.map((startCoordinate, index) => {
      if (index === items.length - 1) {
        return;
      }
      let startIndex = mappedGridIndex.findIndex((dot) => {
        return dot.x === startCoordinate.x && dot.y === startCoordinate.y;
      });

      let endCoordinate = items[index + 1];
      let endIndex = mappedGridIndex.findIndex((dot) => {
        return dot.x === endCoordinate.x && dot.y === endCoordinate.y;
      });
      if (startIndex < 0 || endIndex < 0) {
        return;
      }
      const actualStartDot = grid[startIndex];
      const actualEndDot = grid[endIndex];

      return (
        <Line
          key={`fixedLine-${index}`}
          x1={actualStartDot.x + 35}
          y1={actualStartDot.y + 35}
          x2={actualEndDot.x + 35}
          y2={actualEndDot.y + 35}
          stroke={actualStartDot.color}
          strokeWidth="25"
        />
      );
    });
  };

  return <PatternGenerator />;
}

export default Pattern;
