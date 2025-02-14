export class Todo {
  constructor(name, details = null, dueDate, priority) {
    this.name = name;
    this.details = details;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  static create(name, details, dueDate, priority) {
    if (name === "") {
      throw Error('Name property cannot be empty.')
    }

    if (dueDate === "") {
      throw Error('Due Date property cannot be empty.')
    }

    if (!(dueDate instanceof Date)) {
      throw Error('Due Date must be a valid Date object.');
    }

    return new Todo(name, details, dueDate, priority);
  }
}