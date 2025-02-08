import { Todo } from "./todo";

export class TodoList {
  constructor (name, description = null) {
    this.name = name;
    this.description = description;
    this.todos = [];
  }

  static create(name, description) {
    return new TodoList(name, description);
  }

  addTodo(name, details, dueDate, priority) {
    const todo = TodoList.create(name, details, dueDate, priority);
    this.todos.push[todo];
  }
}