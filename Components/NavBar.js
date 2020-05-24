import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function NavBar() {
  return (
    <View style={styles.style}>
      <Button title="Home" onPress={() => console.log("I'm home")}></Button>
      <Button title="Logout" onPress={() => console.log("I'm LogOut")}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  style: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    marginBottom: 30
  }
});
