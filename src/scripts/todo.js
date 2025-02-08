export class Todo {
  constructor(name, details = null, dueDate, priority) {
    this.name = name;
    this.details = details;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  static create(name, details, dueDate, priority) {
    return new Todo(name, details, dueDate, priority);
  }
}