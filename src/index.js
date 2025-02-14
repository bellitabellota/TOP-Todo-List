import "./styles.css";
import "modern-normalize";
import { ListCollection } from "./scripts/list-collection";
import ScreenController from "./scripts/screen-controller";
import { TodoList } from "./scripts/todo-list";
import { Todo } from "./scripts/todo"
import { loadFromLocalStorage } from "./scripts/local-storage";

const listCollection = initializeListCollection();

const screenController = new ScreenController(listCollection);

if (!loadFromLocalStorage("list collection")) {
  screenController.generateDefaultTodoList();
}

screenController.buildUI();

function initializeListCollection() {
  const parsedData = loadFromLocalStorage("list collection");
  if (parsedData) {
    let listCollection = Object.assign(new ListCollection(), parsedData);
  
    listCollection.all = listCollection.all.map((listData) => {
      const list = Object.assign(new TodoList(), listData);
      
      list.todos = list.todos.map((todoData) => Object.assign(new Todo(), todoData));
      return list;
    });
    return listCollection;
  } else {
    let listCollection = new ListCollection();
    return listCollection;
  }
}

