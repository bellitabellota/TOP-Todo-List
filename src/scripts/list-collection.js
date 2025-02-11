import { TodoList } from "./todo-list";

export class ListCollection {
  constructor() {
    this.all = [];
  }

  addList(name) {
    const list = TodoList.create(name);
    this.all.push(list);
  }

  deleteList(index){
    this.all.splice(index, 1);
  }
}