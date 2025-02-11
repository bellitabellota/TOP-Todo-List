import deleteSvg from "../img/trash-can-outline.svg";
import pencilSvg from "../img/pencil-outline.svg";
import { saveToLocalStorage } from "../local-Storage";

const ScreenController = (function() {
  const generateDefaultTodoList = (listCollection) => {
    listCollection.addList("General");
  
    listCollection.all[0].addTodo("Low Priority Todos", "Low Priority Todos are displayed with a yellow background color. The color yellow stands for happiness, optimism and hope.", "2024-04-20", "low");
  
    listCollection.all[0].addTodo("Medium Priority Todos", "Todos with a medium priority are displayed in orange. Orange signals warmth and comfort.", "2024-04-20", "medium");
  
    listCollection.all[0].addTodo("High Priority Todos", "Todos with a high priority are displayed in red. The color red unambiguously indicates the urgency of that Todo item.", "2024-04-20", "high");
  }

  const renderLists = (listCollection, listsContainer) => {
    listsContainer.innerHTML = generateAllListsHtml(listCollection.all);

    const deleteListButtons = document.querySelectorAll(".js-delete-list-button");
    const deleteListAction = listCollection.deleteList.bind(listCollection);
    addEventListeners(deleteListButtons, deleteListAction, listCollection, listsContainer);
  };

  const generateAllListsHtml = lists => {
    let listHTML = "";

    lists.forEach((list, listIndex) => {
      let listBodyHtml = "";
      list.todos.forEach( todo => listBodyHtml += generateTodoHtml(todo));

      listHTML += generateListHtml(list, listIndex, listBodyHtml);
    })

    return listHTML;
  };

  const generateListHtml = (list, listIndex, listBodyHtml) => {
    return `<div class="list">
            <div class="list-heading-container">
              <h2>${list.name}</h2>
              <button class="delete-button js-delete-list-button" data-list-index=${listIndex}><img src="${deleteSvg}" alt="delete-icon"></button>
            </div>
            <hr>
            <div class="list-body">${listBodyHtml}</div>
            <button class="new-todo-button">Add Todo</button>
          </div>`;
  };

  const generateTodoHtml = todo => {
    return `<div class="todo ${todo.priority}">
              <p class="todo-name">${todo.name}</p>
              <p class="todo-due-date">${todo.dueDate}</p>
              <p class="todo-details">${todo.details}</p>
              <button class="edit-button"><img src="${pencilSvg}"></button>
            </div>`;
  };

  const addEventListeners = (nodeList, action, listCollection, listsContainer) => {
    nodeList.forEach((node) => {
      node.addEventListener("click", () => {
        console.log(node.dataset.listIndex);
        
        action(node.dataset.listIndex);
        renderLists(listCollection, listsContainer);
        saveToLocalStorage("list collection", listCollection);
      });
    });
  }

  return { generateDefaultTodoList, renderLists };
})();

export default ScreenController;