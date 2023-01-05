import { Line } from "react-native-svg";

function ActiveLine({ activeDotCoordinate }) {
  return (
    <>
      {activeDotCoordinate ? (
        <Line
          x1={activeDotCoordinate.x1}
          y1={activeDotCoordinate.y1}
          x2={activeDotCoordinate.x2}
          y2={activeDotCoordinate.y2}
          stroke={activeDotCoordinate.color}
          strokeWidth="25"
        />
      ) : null}
    </>
  );
}

export default ActiveLine;
