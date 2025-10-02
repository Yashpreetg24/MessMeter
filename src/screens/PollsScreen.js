import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../theme/theme";

const options = [
  { id: "paneer_tikka", label: "Add Paneer Tikka Friday" },
  { id: "extra_dessert", label: "Extra Dessert on Sunday" },
  { id: "healthier", label: "Switch to Healthier Oil" },
];

export default function PollsScreen() {
  const [selected, setSelected] = useState(null);

  const submit = () => {
    if (!selected) return alert("Please select an option");
    alert("Thanks for voting!");
    setSelected(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Poll</Text>
      {options.map((o) => (
        <TouchableOpacity key={o.id} onPress={() => setSelected(o.id)} style={[styles.option, selected === o.id && styles.optionActive]}>
          <Text style={styles.optionText}>{o.label}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Submit Vote" color={colors.primary} onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing(3), backgroundColor: colors.background, gap: spacing(2) },
  title: { color: colors.text, fontSize: 20, fontWeight: "bold" },
  option: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, padding: spacing(2), borderRadius: 12 },
  optionActive: { borderColor: colors.accent },
  optionText: { color: colors.text },
});


