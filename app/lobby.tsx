import { View, Text, StyleSheet } from "react-native";

export default function LobbyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Game Lobby</Text>
      <Text>Waiting for players...</Text>
      <Text>Room Code: ABC123</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});