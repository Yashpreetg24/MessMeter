import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  Alert 
} from 'react-native';
import { colors, spacing } from "../theme/theme";
import Toast from "../components/Toast";

const mealOptions = [
  {
    name: "Breakfast",
    emoji: "🌅",
    time: "Morning",
    timeRange: "7:30 AM - 9:00 AM",
    bgColor: "#FFF4E6",
    accentColor: "#FF9800"
  },
  {
    name: "Lunch",
    emoji: "🍛",
    time: "Afternoon",
    timeRange: "1:30 PM - 3:00 PM",
    bgColor: "#E8F5E9",
    accentColor: "#4CAF50"
  },
  {
    name: "Snacks",
    emoji: "☕",
    time: "Evening",
    timeRange: "5:00 PM - 6:30 PM",
    bgColor: "#FFF3E0",
    accentColor: "#FF6F00"
  },
  {
    name: "Dinner",
    emoji: "🌙",
    time: "Night",
    timeRange: "8:00 PM - 10:00 PM",
    bgColor: "#E3F2FD",
    accentColor: "#2196F3"
  }
];

const ratingLabels = ["", 'Poor', "Fair", "Good", "Very Good", 'Excellent']; 

function Star({ filled, onPress, size = 40 }) {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Animated.Text
        style={{
          fontSize: size,
          color: filled ? "#FFD700" : colors.border,
          transform: [{ scale: scaleAnim }]
        }}
      >
        ★
      </Animated.Text>
    </TouchableOpacity>
  );
}

export default function RatingsScreen() {
  const [selectedMeal, setSelectedMeal] = useState(mealOptions[1]); 
  let [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  let [isSubmitted, setIsSubmitted] = useState(false); 
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
  };

  const submit = () => {
    if (rating === 0) {
      showToast("Please select a rating before submitting!", 'warning');
      return;
    }

    setIsSubmitted(true);

    setTimeout(() => {
      setRating(0);
      setComment("");
      setIsSubmitted(false);
      showToast(`Thank you for rating ${selectedMeal.name}! Your feedback helps us improve.`, 'success');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast({ ...toast, visible: false })}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rate Your Meal</Text>
        <Text style={styles.headerSubtitle}>{getCurrentDate()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Meal to Rate</Text>
        <View style={styles.mealList}>
          {mealOptions.map((meal) => (
            <TouchableOpacity
              key={meal.name}
              onPress={() => setSelectedMeal(meal)}
              style={[
                styles.mealCard,
                selectedMeal.name === meal.name && styles.mealCardActive
              ]}
              activeOpacity={0.7}
            >
              <View style={[
                styles.mealCardInner,
                { backgroundColor: selectedMeal.name === meal.name ? meal.bgColor : colors.card }
              ]}>
                <View style={styles.mealIconContainer}>
                  <Text style={styles.mealEmoji}>{meal.emoji}</Text>
                </View>

                <View style={styles.mealInfo}>
                  <Text style={[
                    styles.mealName,
                    selectedMeal.name === meal.name && { color: meal.accentColor }
                  ]}>
                    {meal.name}
                  </Text>
                  <Text style={styles.mealTime}>{meal.time}</Text>
                  <Text style={styles.mealTimeRange}>{meal.timeRange}</Text>
                </View>

                {selectedMeal.name === meal.name && (
                  <View style={[styles.selectedCheckmark, { backgroundColor: meal.accentColor }]}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How was the {selectedMeal.name}?</Text>
        <View style={styles.ratingCard}>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                filled={rating >= i}
                onPress={() => setRating(i)}
                size={44}
              />
            ))}
          </View>
          {rating > 0 && (
            <Text style={styles.ratingLabel}>{ratingLabels[rating]}</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Feedback (Optional)</Text>
        <View style={styles.commentCard}>
          <TextInput
            style={styles.input}
            placeholder="Share your thoughts about the meal..."
            placeholderTextColor={colors.textMuted}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>{comment.length}/200</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          rating === 0 && styles.submitButtonDisabled,
          isSubmitted && styles.submitButtonSubmitted
        ]}
        onPress={submit}
        disabled={isSubmitted}
        activeOpacity={0.8}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitted ? "✓ Submitted!" : "Submit Rating"}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Text style={styles.infoEmoji}>💡</Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Your Feedback Matters</Text>
          <Text style={styles.infoText}>
            Help us improve the mess menu by sharing your honest feedback about each meal.
          </Text>
        </View>
      </View>
    </ScrollView>
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
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing(0.5),
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
  mealList: {
    gap: spacing(2),
  },
  mealCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.border,
  },
  mealCardActive: {
    borderColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  mealCardInner: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing(2.5),
    minHeight: 100,
  },
  mealIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing(2),
    borderWidth: 2,
    borderColor: colors.border,
  },
  mealEmoji: {
    fontSize: 40,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing(0.5),
    letterSpacing: -0.3,
  },
  mealTime: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: spacing(0.3),
  },
  mealTimeRange: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: "500",
  },
  selectedCheckmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: spacing(1),
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  ratingCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing(3),
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  starsRow: {
    flexDirection: "row",
    gap: spacing(1.5),
    marginBottom: spacing(1.5),
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.accent,
    marginTop: spacing(1),
  },
  commentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing(2),
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing(2),
    fontSize: 15,
    minHeight: 100,
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
    backgroundColor: colors.surface,
    marginHorizontal: spacing(3),
    marginTop: spacing(3),
    marginBottom: spacing(3),
    padding: spacing(2.5),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  infoEmoji: {
    fontSize: 32,
    marginRight: spacing(2),
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing(0.5),
  },
  infoText: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
});


