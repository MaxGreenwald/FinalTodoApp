import React, { Component, useState } from "react";
import { Text, StyleSheet, View, Button, TextInput } from "react-native";
import { CheckBox, Icon } from "react-native-elements";

export default function TodoItem({
  todo,
  setActiveTodos,
  changeTodo,
  deleteTodo
}) {
  const [value, onChangeText] = useState(todo.text);
  const [staticChange, setStaticChange] = useState(true);

  return (
    <View style={styles.container}>
      <CheckBox
        center
        uncheckedIcon="circle-o"
        checkedIcon="dot-circle-o"
        checked={todo.completed}
        onPress={() => changeTodo(todo, "completed", !todo.completed)}
      />
      {staticChange ? (
        <Text
          style={!todo.completed ? styles.text : styles.textStrike}
          onPress={() => changeTodo(todo, "completed", !todo.completed)}
        >
          {todo.text}
        </Text>
      ) : (
        <TextInput
          style={{
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            padding: 10
          }}
          onChangeText={text => onChangeText(text)}
          value={value}
        />
      )}
      <Icon
        raised
        name={staticChange ? "pencil" : "thumbs-up"}
        type="font-awesome"
        color="#f50"
        size={13}
        onPress={() => {
          if (!staticChange) changeTodo(todo, "text", value);
          setStaticChange(!staticChange);
          onChangeText(todo.text);
        }}
      />
      <Icon
        raised
        name="trash"
        type="font-awesome"
        color="#f50"
        size={13}
        onPress={() => {
          deleteTodo(todo);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    margin: 10
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5
  },
  text: {
    paddingTop: 20,
    fontSize: 20
  },
  textStrike: {
    paddingTop: 20,
    fontSize: 20,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  }
});
