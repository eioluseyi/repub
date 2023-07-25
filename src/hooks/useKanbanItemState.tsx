import { DragEvent, useContext } from "react";
import { KanbanContext } from "../contexts/KanbanContext";

export const useKanbanItemState = () => {
  const { moveItem } = useContext(KanbanContext);

  const dragStartHandler: (
    e: DragEvent<HTMLDivElement>,
    name: string | undefined,
    currentLevel: number
  ) => void = (e, itemName, currentLevel) => {
    e.dataTransfer.setData("name", itemName || "");
    e.dataTransfer.setData("currentLevel", String(currentLevel));
  };

  const chevronLeftClass = ({ listLevel }: { listLevel: number }) =>
    `move-btn ${listLevel === 1 ? "disabled" : ""}`;

  const chevronRightClass = ({ listLevel }: { listLevel: number }) =>
    `move-btn ${listLevel === 3 ? "disabled" : ""}`;

  const handleLeftClick = ({
    name,
    listLevel
  }: {
    name: string;
    listLevel: number;
  }) =>
    moveItem && moveItem(name, listLevel, listLevel > 1 ? listLevel - 1 : 1);

  const handleRightClick = ({
    name,
    listLevel
  }: {
    name: string;
    listLevel: number;
  }) =>
    moveItem && moveItem(name, listLevel, listLevel < 3 ? listLevel + 1 : 3);

  return {
    dragStartHandler,
    chevronLeftClass,
    chevronRightClass,
    handleLeftClick,
    handleRightClick
  };
};
