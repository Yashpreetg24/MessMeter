import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, spacing } from "../theme/theme";

const sample = [
  { mealType: "Breakfast", items: ["Poha", "Eggs", "Banana"] },
  { mealType: "Lunch", items: ["Dal", "Rice", "Chapati", "Salad"] },
  { mealType: "Snacks", items: ["Samosa", "Chutney"] },
  { mealType: "Dinner", items: ["Paneer", "Naan", "Gulab Jamun"] },
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [mealType, setMealType] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const type = mealType.trim().toLowerCase();
    return sample
      .filter((m) => !type || m.mealType.toLowerCase().startsWith(type))
      .map((m) => ({ ...m, items: m.items.filter((i) => i.toLowerCase().includes(q)) }))
      .filter((m) => m.items.length);
  }, [query, mealType]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search menu</Text>
      <TextInput
        style={styles.input}
        placeholder="Keyword (e.g., Paneer)"
        placeholderTextColor={colors.textMuted}
        value={query}
        onChangeText={setQuery}
      />
      <TextInput
        style={styles.input}
        placeholder="Meal type (Breakfast/Lunch/Snacks/Dinner)"
        placeholderTextColor={colors.textMuted}
        value={mealType}
        onChangeText={setMealType}
      />
      <FlatList
        data={results}
        keyExtractor={(item, index) => `${item.mealType}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.meal}>{item.mealType}</Text>
            {item.items.map((f, i) => (
              <Text key={i} style={styles.item}>• {f}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing(3), backgroundColor: colors.background },
  title: { color: colors.text, fontSize: 20, fontWeight: "bold", marginBottom: spacing(2) },
  input: { backgroundColor: colors.surface, color: colors.text, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: spacing(1.5), marginBottom: spacing(1.5) },
  card: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, padding: spacing(2), borderRadius: 12, marginBottom: spacing(2) },
  meal: { fontWeight: "bold", marginBottom: spacing(1), color: colors.text },
  item: { color: colors.textMuted },
});


