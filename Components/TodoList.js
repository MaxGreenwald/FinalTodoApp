import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TodoItem from "./TodoItem";

export default function TodoList({
  activeTodos,
  setActiveTodos,
  changeTodo,
  deleteTodo
}) {
  return (
    <View style={styles.container}>
      {activeTodos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            setActiveTodos={setActiveTodos}
            changeTodo={changeTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    margin: 10
  },
  container: {
    alignItems: "flex-start"
  }
});
