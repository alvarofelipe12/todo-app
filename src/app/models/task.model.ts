import { CategoryModel } from "./category.model";

export interface TaskModel {
  id: number;
  title: string;
  completed: boolean;
  category?: CategoryModel;
}
