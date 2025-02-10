const screenController = (function() {
  const generateDefaultTodoList = (listCollection) => {
    listCollection.addList("General");
  
    listCollection.all[0].addTodo("Low Priority Todos", "Low Priority Todos are displayed with a yellow background color. The color yellow stands for happiness, optimism and hope.", "2024-04-20", "low");
  
    listCollection.all[0].addTodo("Medium Priority Todos", "Todos with a medium priority are displayed in orange. Orange signals warmth and comfort.", "2024-04-20", "medium");
  
    listCollection.all[0].addTodo("High Priority Todos", "Todos with a high priority are displayed in red. The color red unambiguously indicates the urgency of that Todo item.", "2024-04-20", "high");
  }

  return { generateDefaultTodoList };
})();

export default screenController;