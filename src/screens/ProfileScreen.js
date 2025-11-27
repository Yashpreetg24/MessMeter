import React from 'react';
import { Button, Text, View, StyleSheet } from "react-native";
import { colors, spacing } from "../theme/theme";

export default function ProfileScreen({ navigation }) {
  const handleLogout = async () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={{ height: spacing(2) }} />
      <Button title="Logout" color={colors.danger} onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: spacing(3), backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: "bold", color: colors.text, textAlign: "center" },
});



