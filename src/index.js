import "./styles.css";
import "modern-normalize";
import { ListCollection } from "./scripts/list-collection";
import { displayLists } from "./scripts/display-lists";

const listCollection = new ListCollection();
listCollection.addList("General");
console.log(listCollection.all[0]);

listCollection.all[0].addTodo("Spring cleaning", "This year don't forget to put away your boots. Otherwise you will again not be able to hesitate to wear them in the Summer.", "2024-04-20", "low");

listCollection.all[0].addTodo("Spring cleaning", "This year don't forget to put away your boots. Otherwise you will again not be able to hesitate to wear them in the Summer.", "2024-04-20", "medium");

listCollection.all[0].addTodo("Spring cleaning", "This year don't forget to put away your boots. Otherwise you will again not be able to hesitate to wear them in the Summer.", "2024-04-20", "high");
console.log(listCollection.all[0].todos[0]);

const listsContainer = document.querySelector(".lists-container");


listCollection.addList("Sample");
listCollection.all[1].addTodo("Planning Summer Vacations", "Book Flight, take time of. Ask neighbors to water plants and feed cats.", "2024-04-20", "high");

displayLists(listCollection.all, listsContainer);