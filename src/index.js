import "./styles.css";
import "modern-normalize";
import { ListCollection } from "./scripts/list-collection";
import Screen from "./scripts/screen-controller";
import { TodoList } from "./scripts/todo-list";
import { Todo } from "./scripts/todo"
import { saveToLocalStorage, loadFromLocalStorage } from "./local-Storage";

const listCollection = initializeListCollection();
const listsContainer = document.querySelector(".lists-container");
const newListButton = document.querySelector(".js-new-list-button");
const newListInput = document.querySelector(".js-new-list-input");
const listTitlesContainer = document.querySelector(".js-list-titles");

Screen.renderLists(listCollection, listsContainer, listTitlesContainer);
Screen.renderListTitles(listCollection, listTitlesContainer);



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
    Screen.generateDefaultTodoList(listCollection);
    return listCollection;
  }
}

newListButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (newListInput.value === "") {
    return alert("Input cannot be empty.");
  }

  listCollection.addList(newListInput.value);
  newListInput.value = "";
  Screen.renderLists(listCollection, listsContainer, listTitlesContainer);
  Screen.renderListTitles(listCollection, listTitlesContainer);

  saveToLocalStorage("list collection", listCollection);
})