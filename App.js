/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React, { Component, useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";
import {
  addTodoToCloud,
  syncLocalToCloud,
  deleteTodoToCloud,
  addClearedToCloud,
  updateTodoToCloud
} from "./service/db";
import { YellowBox } from "react-native";
import todoData from "./testData";
import TodoList from "./Components/TodoList";
import EnterTodo from "./Components/EnterTodo";
import { Header } from "react-native-elements";
import NavBar from "./Components/NavBar";
YellowBox.ignoreWarnings(["Warning: ..."]);
console.disableYellowBox = true;

const firebaseCredentials = Platform.select({
  ios: "https://invertase.link/firebase-ios",
  android: "https://invertase.link/firebase-android"
});

// type Props = {};

export default function App() {
  const [activeTodos, setActiveTodos] = useState([]);
  const [clearedTodos, setClearedTodos] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);

  const active = firestore().collection("activeTodos");
  const cleared = firestore().collection("clearedTodos");
  const deleted = firestore().collection("deletedTodos");
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return active.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { text, completed } = doc.data();
        list.push({
          id: doc.id,
          text,
          completed
        });
      });

      console.log("todos in db", list);
      setActiveTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  //function updates todo collection by changing a single todo's attribute to newVal
  const changeTodo = (todo, attribute, newVal) => {
    console.log("I want to change to: ", newVal);
    console.log("I want to attribute to: ", attribute);
    console.log("I want to todo to: ", todo);

    //set new local state
    const newState = activeTodos.map(tempT => {
      if (tempT.id === todo.id) tempT[attribute] = newVal;
      return tempT;
    });
    setActiveTodos(newState);

    //update send to cloud
    updateTodoToCloud(todo, active, attribute, newVal);

    //pull from cloud to get the correct local active state
    syncLocalToCloud(active, setActiveTodos);
  };

  //function creates todo collection by adding a single todo's attribute to newVal
  const addTodo = myText => {
    //create todo and locally set active state
    const myNewTodo = {
      text: myText,
      completed: false
    };
    const newState = activeTodos.concat(myNewTodo);
    setActiveTodos(newState);

    //add todo in the cloud
    addTodoToCloud(myNewTodo, active);

    //pull from cloud to get the correct local active state
    syncLocalToCloud(active, setActiveTodos);
  };

  const deleteTodo = todo => {
    //get todo to delete and locally set active state
    const newState = activeTodos.filter(tempT => tempT.id !== todo.id);
    setActiveTodos(newState);

    //delete todo from active state in cloud and add deleted todo to deleted db
    deleteTodoToCloud(todo, deleted);

    //pull from cloud to get the correct local delete state
    syncLocalToCloud(deleted, setDeletedTodos);
  };

  const clearTodo = () => {
    //get items to clear and locally set active state
    const addClearState = activeTodos.filter(tempT => tempT.completed);
    const newState = activeTodos.filter(tempT => !tempT.completed);
    setActiveTodos(newState);

    //add cleared items to cloud and delete them from active cloud state
    addClearState.forEach(function(entry) {
      addClearedToCloud(entry, cleared);
    });

    //pull from cloud to get the correct local clear state
    syncLocalToCloud(cleared, setClearedTodos);
  };

  return (
    <>
      <Header
        centerComponent={<Text style={styles.header}>My TODO App</Text>}
      ></Header>
      <View style={styles.container}>
        <Text style={styles.welcome}>Enter a todo:</Text>
        <EnterTodo addTodo={addTodo} />
        <Button
          title="Clear Completed Todos"
          onPress={() => clearTodo()}
        ></Button>
        <TodoList
          activeTodos={activeTodos}
          setActiveTodos={setActiveTodos}
          changeTodo={changeTodo}
          deleteTodo={deleteTodo}
        />
        <NavBar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: "left",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
