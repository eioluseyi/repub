import { FC } from "react";
import KanbanItem from "./KanbanItem";
import { useKanbanListState } from "../hooks/useKanbanListState";
import { KanbanListType } from "../types";

const KanbanList: FC<KanbanListType> = ({ title, dataList, listLevel }) => {
  const { dragOverHandler, dropHandler } = useKanbanListState();

  return (
    <>
      <div
        className="kanban-list"
        onDragOver={dragOverHandler}
        onDrop={(e) => dropHandler(e, listLevel)}
      >
        <div className="list-title text-04">
          {title} ({dataList.length})
        </div>
        {dataList.map((itm, idx: number) => (
          <KanbanItem key={idx} name={itm.name} listLevel={listLevel} />
        ))}
      </div>
    </>
  );
};

export default KanbanList;
