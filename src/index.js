import "./styles.css";
import "modern-normalize";
import { ListCollection } from "./scripts/list-collection";
import ScreenController from "./scripts/screen-controller";
import { TodoList } from "./scripts/todo-list";
import { Todo } from "./scripts/todo"
import { saveToLocalStorage, loadFromLocalStorage } from "./local-Storage";

const listCollection = initializeListCollection();
const listsContainer = document.querySelector(".lists-container");
const newListButton = document.querySelector(".js-new-list-button");
const newListInput = document.querySelector(".js-new-list-input");
const listTitlesContainer = document.querySelector(".js-list-titles");
const dialog = document.querySelector(".js-todo-dialog");
const createTodoButton = document.querySelector(".js-create-todo-button")

const name = document.querySelector(".js-todo-name");
const details = document.querySelector(".js-todo-details");
const dueDate = document.querySelector(".js-todo-due-date");
const hiddenListIndex = document.querySelector(".js-hidden-list-index");
const formErrors = document.querySelector(".js-form-errors");

const screenController = new ScreenController(listCollection, listsContainer, listTitlesContainer, dialog, hiddenListIndex);

if (!loadFromLocalStorage("list collection")) {
  screenController.generateDefaultTodoList();
}

screenController.renderLists();
screenController.renderListTitles();



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

function validateFormInput(nameValue, dateValue) {
  let errors = [];

  if (nameValue === "") {
    errors.push("Name is required.");
  }

  if (dateValue === "") {
    errors.push("Due Date is required.");
  }

  return errors;
}

function displayFormErrors(errors) {
  let html = "";
  errors.forEach((error) => { html += `<p>${error}</p>` });
  return html;
}

function isFormInputValid(nameValue, dateValue) {
  formErrors.innerHTML = "";
  let valid = true;

  const errors = validateFormInput(nameValue, dateValue);

  if (errors.length > 0) {
    formErrors.innerHTML = displayFormErrors(errors);
    valid = false;
  }

  return valid;
}

createTodoButton.addEventListener("click", (event) => {
  event.preventDefault();

  const priority = document.querySelector('input[name="priority"]:checked')
  console.log(name.value);
  console.log(details.value);
  console.log(dueDate.value);
  console.log(priority.value);
  console.log(hiddenListIndex.value);

  if(!isFormInputValid(name.value, dueDate.value)) {
    return;
  }
console.log("date object:")
  console.log(new Date(dueDate.value));
  console.log(typeof(new Date(dueDate.value)));

  listCollection.all[hiddenListIndex.value].addTodo(name.value, details.value, new Date(dueDate.value), priority.value);

  name.value = "";
  details.value = "";
  dueDate.value = "";
  document.querySelector('input[name="priority"][value="low"]').checked = true;
  dialog.close();

  screenController.renderLists();
  screenController.renderListTitles();

  saveToLocalStorage("list collection", listCollection);
});

newListButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (newListInput.value === "") {
    return alert("Input cannot be empty.");
  }

  listCollection.addList(newListInput.value);
  newListInput.value = "";
  screenController.renderLists();
  screenController.renderListTitles();

  saveToLocalStorage("list collection", listCollection);
})