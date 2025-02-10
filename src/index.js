import "./styles.css";
import "modern-normalize";
import { ListCollection } from "./scripts/list-collection";
import Screen from "./scripts/screen-controller";

const listCollection = new ListCollection();
const listsContainer = document.querySelector(".lists-container");

Screen.generateDefaultTodoList(listCollection);
Screen.displayLists(listCollection.all, listsContainer);

const newListButton = document.querySelector(".js-new-list-button");
const newListInput = document.querySelector(".js-new-list-input");

newListButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (newListInput.value === "") {
    return alert("Input cannot be empty.");
  }

  listCollection.addList(newListInput.value);
  newListInput.value = "";
  Screen.displayLists(listCollection.all, listsContainer);
})