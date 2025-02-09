export function displayListsInMain(lists, listsContainer) {
  listsContainer.innerHTML = "";

  lists.forEach(list => {
    const listElem = document.createElement("div");
    listElem.className ="list";
    listsContainer.appendChild(listElem);
    
    const listHeading = document.createElement("h2");
    listHeading.textContent = `${list.name}`;
    listElem.appendChild(listHeading);
    const listDescription = document.createElement("p");
    listDescription.textContent = `${list.description}`;
    listElem.appendChild(listDescription);

    const hrElem = document.createElement("hr");
    listElem.appendChild(hrElem);

    list.todos.forEach( todo => {
      const todoContainer = document.createElement("div");
      todoContainer.className = "todo";
      listElem.appendChild(todoContainer);

      const todoName = document.createElement("p");
      todoName.className = "todo-name";
      todoName.textContent = `${todo.name}`;
      todoContainer.appendChild(todoName);

      const todoDetails = document.createElement("p");
      todoDetails.className = "todo-details";
      todoDetails.textContent = `${todo.details}`;
      todoContainer.appendChild(todoDetails);

      const todoDueDate = document.createElement("p");
      todoDueDate.className = "todo-due-date";
      todoDueDate.textContent = `${todo.dueDate}`;
      todoContainer.appendChild(todoDueDate);

      const todoPriority = document.createElement("p");
      todoPriority.className = "todo-priority";
      todoPriority.textContent = `${todo.priority}`;
      todoContainer.appendChild(todoPriority);
    })
  });
}


