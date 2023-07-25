import millify from "millify";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ListItemType, MoveItemType } from "../types";

export const useRepoInfoState = () => {
  const [inProgressList, setInProgressList] = useState<ListItemType[]>([]);
  const [reviewList, setReviewList] = useState<ListItemType[]>([]);
  const [mergeList, setMergeList] = useState<ListItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(!!false);

  const location = useLocation();
  const navigate = useNavigate();

  const getState = () => {
    const localSorageString = localStorage.getItem("repub-state");
    const localState = JSON.parse(localSorageString || "{}");
    const state = location.state || localState;

    localStorage.setItem("repub-state", JSON.stringify(state));

    return state;
  };

  const { response, stargazers_count, name, description } = getState();

  const moveItem: MoveItemType = (name, currentLevel, newLevel) => {
    let item: ListItemType | undefined = { name: "" };

    switch (currentLevel) {
      case 1: {
        item = inProgressList.find((el) => el.name === name);
        setInProgressList((e) => e.filter((el) => el.name !== name));
        break;
      }
      case 2: {
        item = reviewList.find((el) => el.name === name);
        setReviewList((e) => e.filter((el) => el.name !== name));
        break;
      }
      case 3: {
        item = mergeList.find((el) => el.name === name);
        setMergeList((e) => e.filter((el) => el.name !== name));
        break;
      }
      default:
        break;
    }

    if (!item) return;

    switch (newLevel) {
      case 1: {
        setInProgressList((e) => (item ? [...e, item] : e));
        break;
      }
      case 2: {
        setReviewList((e) => (item ? [...e, item] : e));
        break;
      }
      case 3: {
        setMergeList((e) => (item ? [...e, item] : e));
        break;
      }
      default:
        break;
    }
  };

  const handleGoBack = () => navigate("/");

  const numberOfStars = millify(stargazers_count, {
    lowercase: true,
    precision: 1,
  });

  const skeletonList = [
    { title: "In progress" },
    { title: "Review" },
    { title: "Ready to merge" },
  ];

  const kanbanList = [
    { title: "In progress", dataList: inProgressList },
    { title: "Review", dataList: reviewList },
    { title: "Ready to merge", dataList: mergeList },
  ];

  useEffect(() => {
    setInProgressList(response);

    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, [response]);

  return {
    isLoading,
    name,
    description,
    moveItem,
    handleGoBack,
    numberOfStars,
    skeletonList,
    kanbanList,
  };
};
