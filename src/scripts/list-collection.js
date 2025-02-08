import { TodoList } from "./todo-list";

export class ListCollection {
  constructor() {
    this.allTodoLists = [];
  }

  addList(name, description) {
    const list = TodoList.create(name, description);
    this.allTodoLists.push(list);
  }

  get all() {
    return this.allTodoLists;
  }
}