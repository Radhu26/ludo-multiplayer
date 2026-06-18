import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// ─── Constants ───────────────────────────────────────────────────────────────

const GRID_SIZE = 15;
const CELL_SIZE = 22;
const BOARD_SIZE = GRID_SIZE * CELL_SIZE;
const TRACK_LENGTH = 52;

const COLORS = {
  red: "#E53935",
  green: "#43A047",
  blue: "#1E88E5",
  yellow: "#FDD835",
  path: "#FFFFFF",
  pathBorder: "#9E9E9E",
  safePath: "#FFF8E1",
  empty: "#ECEFF1",
  center: "#455A64",
  token: "#D32F2F",
};

type CellCoord = {
  row: number;
  col: number;
};

// Main track: 52 cells clockwise from red start (index 0)
const PATH_CELLS: CellCoord[] = [
  { row: 6, col: 1 },  // 0  – red start
  { row: 5, col: 1 },
  { row: 4, col: 1 },
  { row: 3, col: 1 },
  { row: 2, col: 1 },
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 1, col: 3 },
  { row: 1, col: 4 },
  { row: 1, col: 5 },
  { row: 1, col: 6 },
  { row: 0, col: 6 },
  { row: 0, col: 7 },
  { row: 0, col: 8 },
  { row: 1, col: 8 },
  { row: 1, col: 9 },
  { row: 1, col: 10 },
  { row: 1, col: 11 },
  { row: 1, col: 12 },
  { row: 1, col: 13 },
  { row: 2, col: 13 },
  { row: 3, col: 13 },
  { row: 4, col: 13 },
  { row: 5, col: 13 },
  { row: 6, col: 13 },
  { row: 6, col: 12 },
  { row: 6, col: 11 },
  { row: 6, col: 10 },
  { row: 6, col: 9 },
  { row: 6, col: 8 },
  { row: 7, col: 8 },
  { row: 8, col: 8 },
  { row: 8, col: 9 },
  { row: 8, col: 10 },
  { row: 8, col: 11 },
  { row: 8, col: 12 },
  { row: 8, col: 13 },
  { row: 9, col: 13 },
  { row: 10, col: 13 },
  { row: 11, col: 13 },
  { row: 12, col: 13 },
  { row: 13, col: 13 },
  { row: 13, col: 12 },
  { row: 13, col: 11 },
  { row: 13, col: 10 },
  { row: 13, col: 9 },
  { row: 13, col: 8 },
  { row: 12, col: 8 },
  { row: 11, col: 8 },
  { row: 10, col: 8 },
  { row: 9, col: 8 },
  { row: 8, col: 7 },
];

// Classic safe squares (star zones)
const SAFE_INDICES = new Set([0, 8, 13, 21, 26, 34, 39, 47]);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getPathIndex(row: number, col: number): number {
  return PATH_CELLS.findIndex(
    (cell) => cell.row === row && cell.col === col
  );
}

function isCenterCell(row: number, col: number): boolean {
  return row >= 6 && row <= 8 && col >= 6 && col <= 8;
}

function getHomeColor(row: number, col: number): string | null {
  if (row <= 5 && col <= 5) return COLORS.blue;
  if (row <= 5 && col >= 9) return COLORS.green;
  if (row >= 9 && col <= 5) return COLORS.red;
  if (row >= 9 && col >= 9) return COLORS.yellow;
  return null;
}

function getCellBackground(
  row: number,
  col: number,
  pathIndex: number
): string {
  if (pathIndex >= 0) {
    return SAFE_INDICES.has(pathIndex) ? COLORS.safePath : COLORS.path;
  }
  if (isCenterCell(row, col)) return COLORS.center;
  return getHomeColor(row, col) ?? COLORS.empty;
}

// ─── Small reusable cell component ───────────────────────────────────────────

type BoardCellProps = {
  row: number;
  col: number;
  pathIndex: number;
  showToken: boolean;
};

function BoardCell({ row, col, pathIndex, showToken }: BoardCellProps) {
  const isPath = pathIndex >= 0;

  return (
    <View
      style={[
        styles.cell,
        {
          backgroundColor: getCellBackground(row, col, pathIndex),
          borderColor: isPath ? COLORS.pathBorder : "#CFD8DC",
        },
      ]}
    >
      {isPath && (
        <Text style={styles.cellIndex}>{pathIndex}</Text>
      )}

      {showToken && <View style={styles.token} />}
    </View>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function BoardScreen() {
  const [diceValue, setDiceValue] = useState(1);
  const [position, setPosition] = useState(0);

  const trackPosition = position % TRACK_LENGTH;

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    setPosition((prev) => prev + value);
  };

  const gridCells = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    const pathIndex = getPathIndex(row, col);

    return (
      <BoardCell
        key={`${row}-${col}`}
        row={row}
        col={col}
        pathIndex={pathIndex}
        showToken={pathIndex === trackPosition}
      />
    );
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎲 Ludo Board</Text>

      <View style={styles.board}>
        {gridCells}
      </View>

      <Text style={styles.diceValue}>Dice: {diceValue}</Text>
      <Text style={styles.positionText}>
        Token Position: {trackPosition} / {TRACK_LENGTH - 1}
      </Text>
      <Text style={styles.lapText}>Total steps: {position}</Text>

      <TouchableOpacity style={styles.diceButton} onPress={rollDice}>
        <Text style={styles.diceText}>🎲 Roll Dice</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },

  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 3,
    borderColor: "#263238",
    backgroundColor: COLORS.empty,
  },

  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },

  cellIndex: {
    position: "absolute",
    top: 1,
    left: 2,
    fontSize: 7,
    color: "#757575",
  },

  token: {
    width: CELL_SIZE * 0.55,
    height: CELL_SIZE * 0.55,
    borderRadius: CELL_SIZE * 0.275,
    backgroundColor: COLORS.token,
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 10,
  },

  diceValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    color: "#000",
  },

  positionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    color: COLORS.red,
  },

  lapText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  diceButton: {
    marginTop: 20,
    backgroundColor: "#333",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  diceText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});