import "./styles.css";
import { ListCollection } from "./scripts/list-collection";

const listCollection = new ListCollection();
listCollection.addList("General");
listCollection.addList("Gardening");
console.log(listCollection.all[0]);
console.log(listCollection.all[1]);