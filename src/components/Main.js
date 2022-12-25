import { useState } from "react";
import { GridContext } from "../context";
import useGridGenerator from "../hooks/useGridGenerator";
import Grid from "./Grid/Grid";

function Main() {
  const { grid, mappedGridIndex, setGridData } = useGridGenerator();
  const [score, setScore] = useState(0);
    
  return (
    <GridContext.Provider value={{ grid, mappedGridIndex, setGridData, score, setScore, setGridData }}>
      <Grid />
    </GridContext.Provider>
  );
}

export default Main;
