import { HashMap } from "./hash-map.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

test.set("moon", "white");
test.set("lion", "red");

console.log(test.length(), test.get("mouse"), test.has("mouse"));
console.log(test.entries());
console.log(test.keys());
console.log(test.values());
test.has("mouse");
test.clear();
console.log(test.buckets);
