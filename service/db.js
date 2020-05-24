import React from "react";
import firestore from "@react-native-firebase/firestore";

export async function addTodoToCloud(todo, db) {
  try {
    await db.add({
      text: todo.text,
      completed: todo.completed,
      timestamp: firestore.FieldValue.serverTimestamp()
    });
    console.log("called firebase");
  } catch (e) {
    console.log("Error:", e);
  }
}

export async function updateTodoToCloud(todo, db, attribute, update) {
  try {
    if (attribute === "text") {
      await db.doc(todo.id).update({
        text: update
      });
      console.log("updated firebase");
    } else {
      await db.doc(todo.id).update({
        completed: update
      });
    }
  } catch (e) {
    console.log("Error:", e);
  }
}

export async function deleteTodoToCloud(todo, deleted) {
  //adds deleted todo to deleted db
  addTodoToCloud(todo, deleted);
  console.log("my todo and delete type", todo, deleted);

  //deleted todo from active db
  await firestore()
    .collection("activeTodos")
    .doc(todo.id)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

export async function addClearedToCloud(todo, cleared) {
  //add cleared Todo to Cloud
  addTodoToCloud(todo, cleared);
  console.log("my todo and delete type", todo, cleared);

  //delete cleared todo from active DB
  await firestore()
    .collection("activeTodos")
    .doc(todo.id)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

export async function syncLocalToCloud(db, setTodos) {
  try {
    await db.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { text, completed, timestamp } = doc.data();
        list.push({
          id: doc.id,
          text,
          completed,
          timestamp
        });
      });
      console.log("got all todos from cloud", list);
      setTodos(list);
    });
    console.log("called firebase");
  } catch (e) {
    console.log("Error:", e);
  }
}
