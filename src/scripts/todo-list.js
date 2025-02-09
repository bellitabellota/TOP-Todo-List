import { Todo } from "./todo";

export class TodoList {
  constructor (name) {
    this.name = name;
    this.todos = [];
  }

  static create(name) {
    return new TodoList(name);
  }

  addTodo(name, details, dueDate, priority) {
    const todo = Todo.create(name, details, dueDate, priority);
    this.todos.push(todo);
  }
}