import { TodoList } from "./todo-list";

export class ListCollection {
  constructor() {
    this.all = [];
  }

  addList(name, description) {
    const list = TodoList.create(name);
    this.all.push(list);
  }
}