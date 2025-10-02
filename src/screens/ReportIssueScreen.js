import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function ReportIssueScreen() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) {
      Alert.alert("Please enter an issue description");
      return;
    }
    Alert.alert("Thanks!", "Your issue has been noted.");
    setText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report an issue with the menu</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the issue..."
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 12,
  },
});


