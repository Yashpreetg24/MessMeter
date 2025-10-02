import React, { useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../theme/theme";

const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];

function Star({ filled, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ fontSize: 24, color: filled ? colors.accent : colors.textMuted }}>★</Text>
    </TouchableOpacity>
  );
}

export default function RatingsScreen() {
  const [selectedMeal, setSelectedMeal] = useState("Lunch");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submit = () => {
    // Mock submit
    setRating(0);
    setComment("");
    alert("Thanks for rating " + selectedMeal + "!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate today's meal</Text>
      <FlatList
        data={meals}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing(1) }}
        keyExtractor={(m) => m}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedMeal(item)} style={[styles.chip, selectedMeal === item && styles.chipActive]}>
            <Text style={[styles.chipText, selectedMeal === item && styles.chipTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} filled={rating >= i} onPress={() => setRating(i)} />
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Optional comment"
        placeholderTextColor={colors.textMuted}
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Submit" color={colors.primary} onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing(3), backgroundColor: colors.background, gap: spacing(2) },
  title: { color: colors.text, fontSize: 20, fontWeight: "bold" },
  chip: { borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing(1.5), paddingVertical: spacing(0.75), borderRadius: 20, backgroundColor: colors.surface },
  chipActive: { backgroundColor: colors.card, borderColor: colors.accent },
  chipText: { color: colors.textMuted },
  chipTextActive: { color: colors.text },
  starsRow: { flexDirection: "row", gap: spacing(1) },
  input: { backgroundColor: colors.surface, color: colors.text, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: spacing(1.5) },
});


