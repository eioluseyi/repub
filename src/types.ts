export type MoveItemType = (
  name: string | undefined,
  currentLevel: number,
  newLevel: number
) => void;

export type KanbanListType = {
  title: string;
  dataList: ListItemType[];
  listLevel: number;
};

export type ListItemType = { name: string };
