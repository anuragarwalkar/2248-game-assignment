import { useState } from "react";
import gridGenerator from "../gridGenerator";

function useGridGenerator() {
  const generate = () => {
    return gridGenerator.generate();
  };

  const [grid, setGridData] = useState(() => generate());

  const resetGrid = () => {
    setGridData(generate());
  };

  return [grid, resetGrid];
}

export default useGridGenerator;
