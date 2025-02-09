import deleteSvg from "../img/trash-can-outline.svg";
import pencilSvg from "../img/pencil-outline.svg";

export function displayLists(lists, listsContainer) {
  let listHTML = "";
  
  lists.forEach(list => {
    let listBodyHtml = "";
    list.todos.forEach( todo => {
      listBodyHtml += 
        `<div class="todo ${todo.priority}">
          <p class="todo-name">${todo.name}</p>
          <p class="todo-due-date">${todo.dueDate}</p>
          <p class="todo-details">${todo.details}</p>
          <button class="edit-button"><img src="${pencilSvg}"></button>
        </div>
      `;
  });

  listHTML += 
    `<div class="list">
      <div class="list-heading-container">
        <h2>${list.name}</h2>
        <button class="delete-button"><img src="${deleteSvg}" alt="delete-icon"></button>
      </div>
      <hr>
      <div class="list-body">${listBodyHtml}</div>
      <button class="new-todo-button">Add Todo</button>
    </div>
    `;
  })

  listsContainer.innerHTML = listHTML;
}


