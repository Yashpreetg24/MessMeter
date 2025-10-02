import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../theme/theme";

export default function HomeScreen({ navigation }) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // Local sample menu data
    setMenu([
      {
        mealType: "Breakfast",
        items: ["Poha", "Boiled Eggs", "Banana", "Tea"],
      },
      {
        mealType: "Lunch",
        items: ["Dal Tadka", "Jeera Rice", "Chapati", "Salad"],
      },
      {
        mealType: "Snacks",
        items: ["Samosa", "Chutney", "Masala Chai"],
      },
      {
        mealType: "Dinner",
        items: ["Paneer Butter Masala", "Naan", "Gulab Jamun"],
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Menu</Text>
      <View style={{ marginBottom: spacing(2) }}>
        <Button color={colors.accent} title="Report an issue" onPress={() => navigation.navigate("Report Issue")} />
      </View>
      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.meal}>{item.mealType}</Text>
            {item.items?.map((food, i) => <Text key={i} style={styles.item}>• {food}</Text>)}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing(3), backgroundColor: colors.background },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: spacing(2), color: colors.text },
  card: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, padding: spacing(2), borderRadius: 12, marginBottom: spacing(2) },
  meal: { fontWeight: "bold", marginBottom: spacing(1), color: colors.text },
  item: { color: colors.textMuted },
});



