import "./styles.css";
import { ListCollection } from "./scripts/list-collection";

const listCollection = new ListCollection();
listCollection.addList("General", "All the little things that do not fit elsewhere...");
console.log(listCollection.all[0]);

listCollection.all[0].addTodo("Spring cleaning", "This year don't forget to put away your boots. Otherwise you will again not be able to hesitate to wear them in the Summer.", "2024-04-20", "low");

console.log(listCollection.all[0]);
console.log(listCollection.all[0].todos[0]);