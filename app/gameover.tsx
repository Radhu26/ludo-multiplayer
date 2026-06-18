import { View, Text, StyleSheet } from "react-native";

export default function GameOverScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Game Over</Text>
      <Text>Winner: Player 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
});