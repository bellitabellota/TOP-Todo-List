export class TodoList {
  constructor (name, description = null) {
    this.name = name;
    this.description = description;
    this.todos = [];
  }

  static create(name, description) {
    return new TodoList(name, description);
  }
}