import React, { Component, useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";

export default function EnterTodo({ addTodo }) {
  const [value, onChangeText] = useState("Start typing...");
  return (
    <View style={styles.instructions}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          paddingLeft: 10
        }}
        onChangeText={text => onChangeText(text)}
        placeholder={value}
      />
      <Button
        title="Submit"
        onPress={() => {
          addTodo(value);
          onChangeText("");
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  instructions: {
    padding: 10,
    margin: 10,
    borderRadius: 10
  }
});
