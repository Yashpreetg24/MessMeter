import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Platform 
} from 'react-native';
import { colors, spacing } from "../theme/theme";

const issueCategories = [
  { id: "food_quality", label: "Food Quality", emoji: "🍽️" },
  { id: "hygiene", label: "Hygiene", emoji: "🧼" },
  { id: "service", label: "Service", emoji: "👥" },
  { id: "menu", label: "Menu Variety", emoji: "📋" },
  { id: "timing", label: "Timing", emoji: "⏰" },
  { id: "other", label: "Other", emoji: "💬" },
];

const priorityLevels = [
  { id: "low", label: "Low", color: "#4CAF50" },
  { id: "medium", label: "Medium", color: "#FF9800" },
  { id: "high", label: "High", color: "#F44336" },
];

export default function ReportIssueScreen() {
  let [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("medium");
  let [issueText, setIssueText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedCategory) {
      Alert.alert("Category Required", "Please select an issue category");
      return;
    }
    if (!issueText.trim()) {
      Alert.alert("Description Required", "Please describe the issue");
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      Alert.alert(
        "Issue Reported",
        "Thank you for reporting this issue. We'll look into it and take necessary action."
      );
      setSelectedCategory(null);
      setSelectedPriority("medium");
      setIssueText("");
      setSubmitted(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Report an Issue</Text>
        <Text style={styles.headerSubtitle}>
          Help us improve by reporting problems
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Issue Category *</Text>
          <View style={styles.categoryGrid}>
            {issueCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.categoryLabelActive
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Priority Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priority Level</Text>
          <View style={styles.priorityRow}>
            {priorityLevels.map((priority) => (
              <TouchableOpacity
                key={priority.id}
                style={[
                  styles.priorityButton,
                  selectedPriority === priority.id && {
                    backgroundColor: priority.color,
                    borderColor: priority.color,
                  }
                ]}
                onPress={() => setSelectedPriority(priority.id)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.priorityText,
                  selectedPriority === priority.id && styles.priorityTextActive
                ]}>
                  {priority.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Issue Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Describe the Issue *</Text>
          <TextInput
            style={styles.input}
            placeholder="Please provide details about the issue..."
            placeholderTextColor={colors.textMuted}
            value={issueText}
            onChangeText={setIssueText}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>{issueText.length}/500</Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedCategory || !issueText.trim()) && styles.submitButtonDisabled,
            submitted && styles.submitButtonSubmitted
          ]}
          onPress={handleSubmit}
          disabled={submitted}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            {submitted ? "✓ Submitted!" : "Submit Issue"}
          </Text>
        </TouchableOpacity>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>ℹ️</Text>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Quick Response</Text>
            <Text style={styles.infoText}>
              We review all issues within 24 hours and take immediate action on high-priority matters.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing(3),
    paddingTop: spacing(2),
    paddingBottom: spacing(3),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginTop: spacing(0.8),
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing(3),
    marginTop: spacing(3),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing(2),
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing(2),
  },
  categoryCard: {
    width: "31%",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing(2),
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.border,
    minHeight: 90,
    justifyContent: "center",
  },
  categoryCardActive: {
    borderColor: colors.accent,
    backgroundColor: "#FFF9F0",
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: spacing(0.8),
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMuted,
    textAlign: "center",
  },
  categoryLabelActive: {
    color: colors.accent,
    fontWeight: "700",
  },
  priorityRow: {
    flexDirection: "row",
    gap: spacing(2),
  },
  priorityButton: {
    flex: 1,
    paddingVertical: spacing(1.8),
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
  },
  priorityText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  priorityTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing(2),
    fontSize: 15,
    minHeight: 140,
    fontWeight: "500",
  },
  characterCount: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "right",
    marginTop: spacing(1),
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing(3),
    marginTop: spacing(3),
    paddingVertical: spacing(2),
    borderRadius: 12,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonSubmitted: {
    backgroundColor: "#4CAF50",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    marginHorizontal: spacing(3),
    marginTop: spacing(3),
    marginBottom: spacing(3),
    padding: spacing(3),
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#2196F3",
    alignItems: "center",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  infoEmoji: {
    fontSize: 36,
    marginRight: spacing(2.5),
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000000",
    marginBottom: spacing(0.8),
    letterSpacing: -0.2,
  },
  infoText: {
    fontSize: 14,
    color: "#2A2A2A",
    lineHeight: 20,
    fontWeight: "500",
  },
});


