import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function BoardScreen() {
  const [diceValue, setDiceValue] = useState(1);
  const [position, setPosition] = useState(0);

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;

    setDiceValue(value);
    setPosition((prev) => prev + value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎲 Ludo Board</Text>

      <View style={styles.board}>
        <View style={[styles.box, styles.red]} />
        <View style={[styles.box, styles.green]} />
        <View style={[styles.box, styles.blue]} />
        <View style={[styles.box, styles.yellow]} />
      </View>

      <Text style={styles.diceValue}>
        Dice: {diceValue}
      </Text>

      <Text style={styles.positionText}>
        Token Position: {position}
      </Text>

      <TouchableOpacity
        style={styles.diceButton}
        onPress={rollDice}
      >
        <Text style={styles.diceText}>🎲 Roll Dice</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  board: {
    width: 250,
    height: 250,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 2,
    borderColor: "#000",
  },

  box: {
    width: "50%",
    height: "50%",
  },

  red: {
    backgroundColor: "#ff4d4d",
  },

  green: {
    backgroundColor: "#4CAF50",
  },

  blue: {
    backgroundColor: "#2196F3",
  },

  yellow: {
    backgroundColor: "#FFD700",
  },

  diceValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "black",
  },

  positionText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "red",
  },

  diceButton: {
    marginTop: 20,
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  diceText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});