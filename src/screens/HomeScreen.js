import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert 
} from "react-native";
import { colors, spacing } from "../theme/theme";
import { getTodayMenu, getWeekMenu, getMonthMenu } from "../../data";

export default function HomeScreen({ navigation }) {
  const [viewMode, setViewMode] = useState("day"); 
  let [menuStuff, setMenuStuff] = useState(null); 
  const [fadeAnim] = useState(new Animated.Value(1));
  let [currentlySelectedDate, setCurrentlySelectedDate] = useState(null); 

  useEffect(() => {
    setCurrentlySelectedDate(null); 
    loadMenuData();
  }, [viewMode]);

  const loadMenuData = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      if (viewMode === "day") {
        setMenuStuff(getTodayMenu());
      } else if (viewMode === "week") {
        setMenuStuff(getWeekMenu());
      } else {
        setMenuStuff(getMonthMenu());
      }

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderSegmentedControl = () => (
    <View style={styles.segmentedControl}>
      {["day", "week", "month"].map((mode) => (
        <TouchableOpacity
          key={mode}
          style={[
            styles.segment,
            viewMode === mode && styles.segmentActive,
          ]}
          onPress={() => setViewMode(mode)}
        >
          <Text
            style={[
              styles.segmentText,
              viewMode === mode && styles.segmentTextActive,
            ]}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMealCard = (mealType, items, isCompact = false) => (
    <View style={[styles.mealCard, isCompact && styles.mealCardCompact]}>
      <View style={styles.mealHeader}>
        <Text style={styles.mealType}>{mealType}</Text>
        <View style={styles.mealIcon}>
          <Text style={styles.mealEmoji}>
            {mealType === "Breakfast" ? "🌅" :
              mealType === "Lunch" ? "🍛" :
                mealType === "Snacks" ? "☕" : "🌙"}
          </Text>
        </View>
      </View>
      <View style={styles.itemsContainer}>
        {items?.map((item, idx) => (
          <View key={idx} style={styles.itemRow}>
            <View style={styles.bullet} />
            <Text style={[styles.itemText, isCompact && styles.itemTextCompact]}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderDayView = () => {
    if (!menuStuff) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No menu available for today</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>
        {menuStuff?.breakfast && renderMealCard("Breakfast", menuStuff.breakfast)}
        {menuStuff?.lunch && renderMealCard("Lunch", menuStuff.lunch)}
        {menuStuff?.snacks && renderMealCard("Snacks", menuStuff.snacks)}
        {menuStuff?.dinner && renderMealCard("Dinner", menuStuff.dinner)}
      </ScrollView>
    );
  };

  const renderWeekView = () => {
    if (!menuStuff || menuStuff?.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No menu available for this week</Text>
        </View>
      );
    }

    if (currentlySelectedDate) {
      const dayMenu = menuStuff?.find(item => item.date === currentlySelectedDate);
      if (dayMenu) {
        return (
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedDate(null)}
            >
              <Text style={styles.backButtonText}>← Back to Calendar</Text>
            </TouchableOpacity>

            <View style={styles.dateHeader}>
              <Text style={styles.dateText}>
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>

            {dayMenu.breakfast && renderMealCard("Breakfast", dayMenu.breakfast)}
            {dayMenu.lunch && renderMealCard("Lunch", dayMenu.lunch)}
            {dayMenu.snacks && renderMealCard("Snacks", dayMenu.snacks)}
            {dayMenu.dinner && renderMealCard("Dinner", dayMenu.dinner)}
          </ScrollView>
        );
      }
    }

    let today = new Date();

    return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.calendarTitle}>This Week</Text>
        <View style={styles.calendarGrid}>
          {Array.isArray(menuStuff) && menuStuff.map((item) => {
            const itemDate = new Date(item.date);
            const isToday = itemDate.toDateString() === today.toDateString();

            return (
              <TouchableOpacity
                key={item.date}
                style={[styles.calendarDay, isToday && styles.calendarDayToday]}
                onPress={() => setCurrentlySelectedDate(item.date)}
              >
                <Text style={[styles.calendarDayName, isToday && styles.calendarDayNameToday]}>
                  {item.dayName}
                </Text>
                <Text style={[styles.calendarDayNumber, isToday && styles.calendarDayNumberToday]}>
                  {item.dayNumber}
                </Text>
                <View style={[styles.calendarIndicator, isToday && styles.calendarIndicatorToday]} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  const renderMonthView = () => {
    if (!menuStuff || menuStuff?.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No menu available for this month</Text>
        </View>
      );
    }

    if (currentlySelectedDate) {
      const dayMenu = menuStuff?.find(item => item.date === currentlySelectedDate);
      if (dayMenu) {
        return (
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedDate(null)}
            >
              <Text style={styles.backButtonText}>← Back to Calendar</Text>
            </TouchableOpacity>

            <View style={styles.dateHeader}>
              <Text style={styles.dateText}>
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>

            {dayMenu.breakfast && renderMealCard("Breakfast", dayMenu.breakfast)}
            {dayMenu.lunch && renderMealCard("Lunch", dayMenu.lunch)}
            {dayMenu.snacks && renderMealCard("Snacks", dayMenu.snacks)}
            {dayMenu.dinner && renderMealCard("Dinner", dayMenu.dinner)}
          </ScrollView>
        );
      }
    }

    let today = new Date();
    const monthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.calendarTitle}>{monthName}</Text>
        <View style={styles.calendarGrid}>
          {Array.isArray(menuStuff) && menuStuff.map((item) => {
            const itemDate = new Date(item.date);
            const isToday = itemDate.toDateString() === today.toDateString();

            return (
              <TouchableOpacity
                key={item.date}
                style={[styles.calendarDay, isToday && styles.calendarDayToday]}
                onPress={() => setCurrentlySelectedDate(item.date)}
              >
                <Text style={[styles.calendarDayName, isToday && styles.calendarDayNameToday]}>
                  {item.dayName}
                </Text>
                <Text style={[styles.calendarDayNumber, isToday && styles.calendarDayNumberToday]}>
                  {item.dayNumber}
                </Text>
                <View style={[styles.calendarIndicator, isToday && styles.calendarIndicatorToday]} />
              </TouchableOpacity>
            );
          })}
        </View>


        <View style={styles.comingSoonBanner}>
          <View style={styles.comingSoonContent}>
            <Text style={styles.comingSoonEmoji}>🍽️</Text>
            <View style={styles.comingSoonTextContainer}>
              <Text style={styles.comingSoonTitle}>Next Month Meals</Text>
              <Text style={styles.comingSoonSubtitle}>Coming Soon →</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Mess Menu</Text>
        <Text style={styles.headerSubtitle}>Your Daily Meals</Text>
      </View>

      {renderSegmentedControl()}

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {viewMode === "day" && renderDayView()}
        {viewMode === "week" && renderWeekView()}
        {viewMode === "month" && renderMonthView()}
      </Animated.View>
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
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing(0.5),
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    margin: spacing(3),
    padding: spacing(0.5),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing(1.5),
    alignItems: "center",
    borderRadius: 10,
  },
  segmentActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  segmentText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textMuted,
  },
  segmentTextActive: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing(3),
  },
  scrollView: {
    flex: 1,
  },
  dateHeader: {
    marginBottom: spacing(3),
    paddingVertical: spacing(2),
    paddingHorizontal: spacing(2.5),
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  mealCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing(2.5),
    marginBottom: spacing(2),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  mealCardCompact: {
    padding: spacing(1.5),
    marginBottom: spacing(1.5),
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing(1.5),
  },
  mealType: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  mealIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  mealEmoji: {
    fontSize: 18,
  },
  itemsContainer: {
    gap: spacing(1),
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing(0.5),
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginRight: spacing(1.5),
  },
  itemText: {
    fontSize: 15,
    color: colors.textMuted,
    flex: 1,
  },
  itemTextCompact: {
    fontSize: 13,
  },
  dayCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing(2.5),
    marginBottom: spacing(2),
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing(2),
    paddingBottom: spacing(1.5),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dayName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  dayNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primary,
  },
  compactMealsContainer: {
    gap: spacing(0.5),
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing(8),
  },
  emptyText: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing(1.5),
    paddingHorizontal: spacing(2),
    borderRadius: 10,
    marginBottom: spacing(2),
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },
  calendarTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing(2),
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing(2),
    justifyContent: "space-between",
  },
  calendarDay: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing(2),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calendarDayToday: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  calendarDayName: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: spacing(0.5),
  },
  calendarDayNameToday: {
    color: "#FFFFFF",
  },
  calendarDayNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing(0.5),
  },
  calendarDayNumberToday: {
    color: "#FFFFFF",
  },
  calendarIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginTop: spacing(0.5),
  },
  calendarIndicatorToday: {
    backgroundColor: "#FFFFFF",
  },
  comingSoonBanner: {
    marginTop: spacing(3),
    marginBottom: spacing(2),
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing(3),
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  comingSoonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  comingSoonEmoji: {
    fontSize: 40,
    marginRight: spacing(2),
  },
  comingSoonTextContainer: {
    flex: 1,
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing(0.5),
  },
  comingSoonSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.accent,
  },
});



