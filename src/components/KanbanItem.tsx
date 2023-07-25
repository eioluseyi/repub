import { FC } from "react";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../assets/chevron-right.svg";
import { useKanbanItemState } from "../hooks/useKanbanItemState";
import { ListItemType } from "../types";

const KanbanItem: FC<ListItemType & { listLevel: number }> = ({
  name,
  listLevel
}) => {
  const {
    dragStartHandler,
    chevronLeftClass,
    chevronRightClass,
    handleLeftClick,
    handleRightClick
  } = useKanbanItemState();

  return (
    <div
      className="kanban-item text-03"
      onDragStart={(e) => dragStartHandler(e, name, listLevel)}
      draggable
    >
      <button
        onClick={() =>
          handleLeftClick({
            name,
            listLevel
          })
        }
        className={chevronLeftClass({ listLevel })}
      >
        <ChevronLeft />
      </button>
      <span className="kanban-item-name">{name}</span>
      <button
        onClick={() =>
          handleRightClick({
            name,
            listLevel
          })
        }
        className={chevronRightClass({ listLevel })}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default KanbanItem;
