import { useState } from "react";
import useGridGenerator from "./useGridGenerator";

function useCustomContext() {
    const { grid, mappedGridIndex, setGridData, resetGrid, } = useGridGenerator();
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
  
    const onRestart = () => {
      setScore(0);
      resetGrid();
      setShowModal(false);
    }
  
    const onHideModal = () => {
      setShowModal(false)
    }

    const provider = {
        grid,
        mappedGridIndex,
        setGridData,
        score,
        setScore,
        setGridData,
        showModal, 
        setShowModal,
      }

    return {onRestart, onHideModal, score, showModal, provider}
}

export default useCustomContext;