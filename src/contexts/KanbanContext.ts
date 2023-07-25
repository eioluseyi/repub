import { createContext } from "react";
import { MoveItemType } from "../types";

export const KanbanContext = createContext<{
  moveItem?: MoveItemType;
}>({});
