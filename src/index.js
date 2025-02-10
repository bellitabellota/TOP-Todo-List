import "./styles.css";
import "modern-normalize";
import { ListCollection } from "./scripts/list-collection";
import { displayLists } from "./scripts/display-lists";
import Screen from "./scripts/screen-controller";

const listCollection = new ListCollection();

Screen.generateDefaultTodoList(listCollection);

const listsContainer = document.querySelector(".lists-container");
displayLists(listCollection.all, listsContainer);

const newListButton = document.querySelector(".js-new-list-button");
const newListInput = document.querySelector(".js-new-list-input");

newListButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (newListInput.value === "") {
    return alert("Input cannot be empty.");
  }

  listCollection.addList(newListInput.value);
  newListInput.value = "";
  displayLists(listCollection.all, listsContainer);
})