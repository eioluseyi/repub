import { FC } from "react";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../assets/chevron-right.svg";

const KanbanSkeleton: FC<{
  title: string;
  count?: number;
}> = ({ title, count = 0 }) => {
  return (
    <>
      <div className="kanban-list skeleton">
        <div className="list-title text-04">
          {title} ({count})
        </div>
        <div className="kanban-item text-03">
          <button className="move-btn disabled">
            <ChevronLeft />
          </button>
          <span className="kanban-item-name">loading...</span>
          <button className="move-btn disabled">
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default KanbanSkeleton;
