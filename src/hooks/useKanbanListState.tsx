import { DragEvent, useContext } from "react";
import { KanbanContext } from "../contexts/KanbanContext";

export const useKanbanListState = () => {
  const { moveItem } = useContext(KanbanContext);

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, newLevel: number) => {
    if (moveItem)
      moveItem(
        e.dataTransfer.getData("name"),
        Number(e.dataTransfer.getData("currentLevel")),
        Number(newLevel || 1)
      );
  };

  return { dragOverHandler, dropHandler };
};
