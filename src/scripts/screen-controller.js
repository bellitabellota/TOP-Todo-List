import deleteSvg from "../img/trash-can-outline.svg";
import pencilSvg from "../img/pencil-outline.svg";
import { saveToLocalStorage } from "../local-Storage";
import { format } from 'date-fns';

class ScreenController {
  constructor(listCollection) {
    this.listCollection = listCollection;
    this.listsContainer = document.querySelector(".lists-container");
    this.listTitlesContainer = document.querySelector(".js-list-titles");
    this.dialog = document.querySelector(".js-todo-dialog");
    this.hiddenListIndex = document.querySelector(".js-hidden-list-index");

    this.newListButton = document.querySelector(".js-new-list-button");
    this.newListInput = document.querySelector(".js-new-list-input");
    
    this.createTodoButton = document.querySelector(".js-create-todo-button")
    
    this.name = document.querySelector(".js-todo-name");
    this.details = document.querySelector(".js-todo-details");
    this.dueDate = document.querySelector(".js-todo-due-date");
    this.formErrors = document.querySelector(".js-form-errors");
  }

  generateDefaultTodoList() {
    this.listCollection.addList("General");
  
    this.listCollection.all[0].addTodo("Low Priority Todos", "Low Priority Todos are displayed with a yellow background color. The color yellow stands for happiness, optimism and hope.", new Date("2024-04-20"), "low");
  
    this.listCollection.all[0].addTodo("Medium Priority Todos", "Todos with a medium priority are displayed in orange. Orange signals warmth and comfort.", new Date("2024-04-20"), "medium");
  
    this.listCollection.all[0].addTodo("High Priority Todos", "Todos with a high priority are displayed in red. The color red unambiguously indicates the urgency of that Todo item.", new Date("2024-04-20"), "high");
  }

  renderLists() {
    this.listsContainer.innerHTML = this.generateAllListsHtml(this.listCollection.all);

    const deleteListButtons = document.querySelectorAll(".js-delete-list-button");
    this.addEventListeners(deleteListButtons, this.listCollection.deleteList.bind(this.listCollection));

    const newTodoButtons = document.querySelectorAll(".js-new-todo-button");
    newTodoButtons.forEach((newTodoButton) => {
      newTodoButton.addEventListener("click", () => {
        this.hiddenListIndex.value = newTodoButton.dataset.listIndex;
        this.dialog.showModal();
      });
    });

    const editTodoButtons = document.querySelectorAll(".js-edit-todo-button");
    editTodoButtons.forEach((editTodoButton) => {
      editTodoButton.addEventListener("click", () => {

        const todo = this.listCollection.all[editTodoButton.dataset.listIndex].todos[editTodoButton.dataset.todoIndex];
        console.log(todo);

        this.dialog.showModal();

        this.displayFormForTodo(todo, editTodoButton.dataset.listIndex, editTodoButton.dataset.todoIndex);
        
        /* when dialog is save Form input needs to be validated and saved */
      });
    });
  };

  displayFormForTodo(todo, listIndex, todoIndex) {
    const name = document.querySelector(".js-todo-name");
    const details = document.querySelector(".js-todo-details");

    const dueDate = document.querySelector(".js-todo-due-date");
    const hiddenListIndex = document.querySelector(".js-hidden-list-index");
    const hiddenTodoIndex = document.querySelector(".js-hidden-todo-index");
    /* const formErrors = document.querySelector(".js-form-errors"); */

    hiddenListIndex.value = listIndex;
    hiddenTodoIndex.value = todoIndex;
    name.value = todo.name;
    details.value = todo.details;
    dueDate.value = format(todo.dueDate, "yyyy-MM-dd");


    const priorityRadios = document.querySelectorAll('input[name="priority"]');
    priorityRadios.forEach(radio => {
        if (radio.value === todo.priority) {
          radio.checked = true;
        }
    });
  };

  renderListTitles() {
    this.listTitlesContainer.innerHTML = "";
    this.listCollection.all.forEach((list) => {
      const listTitleElement = document.createElement("p");
      listTitleElement.textContent = `${list.name}`;
      this.listTitlesContainer.append(listTitleElement);
    });
  };

  generateAllListsHtml(lists) {
    let listHTML = "";

    lists.forEach((list, listIndex) => {
      let listBodyHtml = "";
      list.todos.forEach( (todo, todoIndex) => listBodyHtml += this.generateTodoHtml(todo, listIndex, todoIndex));

      listHTML += this.generateListHtml(list, listIndex, listBodyHtml);
    })

    return listHTML;
  };

  generateListHtml(list, listIndex, listBodyHtml) {
    return `<div class="list">
            <div class="list-heading-container">
              <h2>${list.name}</h2>
              <button class="delete-button js-delete-list-button" data-list-index=${listIndex}><img src="${deleteSvg}" alt="delete-icon"></button>
            </div>
            <hr>
            <div class="list-body">${listBodyHtml}</div>
            <button class="new-todo-button js-new-todo-button" data-list-index=${listIndex}>Add Todo</button>
          </div>`;
  };

  generateTodoHtml(todo, listIndex, todoIndex) {
    return `<div class="todo ${todo.priority}">
              <p class="todo-name">${todo.name}</p>
              <p class="todo-due-date">${format(todo.dueDate, "dd-MM-yyy")}</p>
              <p class="todo-details">${todo.details}</p>
              <button class="edit-button js-edit-todo-button" data-list-index=${listIndex} data-todo-index=${todoIndex}><img src="${pencilSvg}"></button>
            </div>`;
  };

  addEventListeners(nodeList, action) {
    nodeList.forEach((node) => {
      node.addEventListener("click", () => {
        action(node.dataset.listIndex);
        this.renderLists();
        this.renderListTitles();
        saveToLocalStorage("list collection", this.listCollection);
      });
    });
  }

  addNewListButtonEventListener() {
    this.newListButton.addEventListener("click", (event) => {
      event.preventDefault();

    
      if (this.newListInput.value === "") {
        return alert("Input cannot be empty.");
      }
    
      this.listCollection.addList(this.newListInput.value);
      this.newListInput.value = "";
      this.renderLists();
      this.renderListTitles();
    
      saveToLocalStorage("list collection", this.listCollection);
    })
  }





  validateFormInput(nameValue, dateValue) {
  let errors = [];

  if (nameValue === "") {
    errors.push("Name is required.");
  }

  if (dateValue === "") {
    errors.push("Due Date is required.");
  }

  return errors;
}

displayFormErrors(errors) {
  let html = "";
  errors.forEach((error) => { html += `<p>${error}</p>` });
  return html;
}

isFormInputValid(nameValue, dateValue) {
  this.formErrors.innerHTML = "";
  let valid = true;

  const errors = this.validateFormInput(nameValue, dateValue);

  if (errors.length > 0) {
    this.formErrors.innerHTML = this.displayFormErrors(errors);
    valid = false;
  }

  return valid;
}

addCreateTodoButtonEventListener() {
  this.createTodoButton.addEventListener("click", (event) => {
  event.preventDefault();

  const priority = document.querySelector('input[name="priority"]:checked')

  if(!this.isFormInputValid(this.name.value, this.dueDate.value)) {
    return;
  }


 /*  console.log(this.dueDate.value); */
  console.log(priority.value);

  this.listCollection.all[this.hiddenListIndex.value].addTodo(this.name.value, this.details.value, new Date(this.dueDate.value), priority.value);

  this.name.value = "";
  this.details.value = "";
  this.dueDate.value = "";
  document.querySelector('input[name="priority"][value="low"]').checked = true;
  this.dialog.close();

  this.renderLists();
  this.renderListTitles();

  saveToLocalStorage("list collection", this.listCollection);
});
}

  
};

export default ScreenController;