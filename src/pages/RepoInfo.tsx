import { ReactComponent as StarIcon } from "../assets/star-icon.svg";
import { ReactComponent as BackIcon } from "../assets/back-icon.svg";
import { KanbanContext } from "../contexts/KanbanContext";
import KanbanList from "../components/KanbanList";
import KanbanSkeleton from "../components/KanbanSkeleton";
import { useRepoInfoState } from "../hooks/useRepoInfoState";

export default function RepoInfo() {
  const {
    isLoading,
    name,
    description,
    moveItem,
    handleGoBack,
    numberOfStars,
    skeletonList,
    kanbanList
  } = useRepoInfoState();

  return (
    <div className="repo-kanban-wrapper">
      <div className="repo-info">
        <div className="back-btn-wrapper">
          <button onClick={handleGoBack} className="back-btn">
            <BackIcon />
          </button>
        </div>
        <div className="description-container">
          <h1 className="text-01 headline">{name}</h1>
          <div className="text-03 description">{description}</div>
        </div>
        <div className="stargazers text-04">
          <StarIcon />
          {numberOfStars}
        </div>
      </div>

      <div className="repo-kanban">
        <KanbanContext.Provider value={{ moveItem }}>
          {isLoading
            ? skeletonList.map((itm, idx) => (
                <KanbanSkeleton key={idx} title={itm.title} />
              ))
            : kanbanList.map((itm, idx) => (
                <KanbanList
                  key={idx}
                  title={itm.title}
                  dataList={itm.dataList}
                  listLevel={idx + 1}
                />
              ))}
        </KanbanContext.Provider>
      </div>
    </div>
  );
}
