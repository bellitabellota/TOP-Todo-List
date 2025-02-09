import "./styles.css";
import "modern-normalize";
import { ListCollection } from "./scripts/list-collection";
import { displayListsInMain } from "./scripts/display-lists-in-main";

const listCollection = new ListCollection();
listCollection.addList("General");
console.log(listCollection.all[0]);

listCollection.all[0].addTodo("Spring cleaning", "This year don't forget to put away your boots. Otherwise you will again not be able to hesitate to wear them in the Summer.", "2024-04-20", "low");

console.log(listCollection.all[0].todos[0]);

const listsContainer = document.querySelector(".lists-container");

displayListsInMain(listCollection.all, listsContainer);