import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, spacing } from "../theme/theme";

export default function LoginScreen({ navigation }) {
  let [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [error, setError] = useState("");

  const handleLogin = async () => {
    const isValid = email.trim().toLowerCase() === "yash" && password === "123";
    if (isValid) {
      navigation.replace("Main", { username: email.trim() });
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mess Meter</Text>
      <Text style={styles.subtitle}>Welcome back</Text>
      <View style={styles.demoBox}>
        <Text style={styles.demoTitle}>Demo credentials</Text>
        <Text style={styles.demoText}>Username: yash</Text>
        <Text style={styles.demoText}>Password: 123</Text>
      </View>
      <TextInput placeholder="Username" placeholderTextColor={colors.textMuted} value={email} onChangeText={setEmail} autoCapitalize="none" style={styles.input} />
      <TextInput placeholder="Password" placeholderTextColor={colors.textMuted} value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={{ height: spacing(1) }} />
      <Button title="Login" color={colors.primary} onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: spacing(3), backgroundColor: colors.background },
  title: { fontSize: 26, fontWeight: "bold", color: colors.text },
  subtitle: { color: colors.textMuted, marginBottom: spacing(2) },
  input: { backgroundColor: colors.surface, color: colors.text, borderWidth: 1, borderColor: colors.border, padding: spacing(1.5), marginBottom: spacing(1.5), borderRadius: 10 },
  error: { color: colors.danger, marginBottom: spacing(1) },
  demoBox: { backgroundColor: colors.card, borderRadius: 10, padding: spacing(1.5), marginBottom: spacing(2), borderWidth: 1, borderColor: colors.border },
  demoTitle: { fontWeight: "bold", color: colors.text, marginBottom: spacing(0.5) },
  demoText: { color: colors.textMuted },
});



