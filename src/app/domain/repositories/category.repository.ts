export abstract class CategoryRepository {
  abstract addCategory(name: string): void;
  abstract deleteCategory(id: number): void;
  abstract updateCategory(id: number, name: string): void;
}
