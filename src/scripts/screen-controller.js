import deleteSvg from "../img/trash-can-outline.svg";
import pencilSvg from "../img/pencil-outline.svg";
import { saveToLocalStorage } from "../local-Storage";
import { format } from 'date-fns';

class ScreenController {
  constructor(listCollection, listsContainer, listTitlesContainer, dialog, hiddenListIndex) {
    this.listCollection = listCollection;
    this.listsContainer = listsContainer;
    this.listTitlesContainer = listTitlesContainer;
    this.dialog = dialog;
    this.hiddenListIndex = hiddenListIndex;
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
      list.todos.forEach( todo => listBodyHtml += this.generateTodoHtml(todo));

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

  generateTodoHtml(todo) {
    return `<div class="todo ${todo.priority}">
              <p class="todo-name">${todo.name}</p>
              <p class="todo-due-date">${format(todo.dueDate, "dd-MM-yyy")}</p>
              <p class="todo-details">${todo.details}</p>
              <button class="edit-button"><img src="${pencilSvg}"></button>
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
};

export default ScreenController;