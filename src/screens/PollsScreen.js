import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Animated
} from "react-native";
import { colors, spacing } from "../theme/theme";
import Toast from "../components/Toast";

const getEndOfWeek = (weeksFromNow = 0) => {
  let today = new Date();
  const currentDay = today.getDay(); 
  const daysUntilSunday = currentDay === 0 ? 0 : 7 - currentDay;

  let endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + daysUntilSunday + (weeksFromNow * 7));

  const dateStr = endOfWeek.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return `${dateStr} at 11:59 PM`;
};

const initialPollsData = [
  {
    id: "poll_1",
    question: "What should we add to Friday's menu?",
    status: "active", 
    endDate: getEndOfWeek(0), 
    totalVotes: 156,
    options: [
      { id: "paneer_tikka", label: "Paneer Tikka", votes: 67, emoji: "🧈" },
      { id: "veg_biryani", label: "Veg Biryani", votes: 45, emoji: "🍚" },
      { id: "chole_bhature", label: "Chole Bhature", votes: 28, emoji: "🫓" },
      { id: "pasta", label: "Pasta", votes: 16, emoji: "🍝" },
    ]
  },
  {
    id: "poll_2",
    question: "Should we add extra dessert on Sundays?",
    status: "active",
    endDate: getEndOfWeek(1), 
    totalVotes: 203,
    options: [
      { id: "yes_dessert", label: "Yes, please!", votes: 178, emoji: "🍰" },
      { id: "no_dessert", label: "No, keep it same", votes: 25, emoji: "❌" },
    ]
  }
];

const ProgressBar = ({ percentage, color }) => {
  const [width] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(width, {
      toValue: percentage,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const animatedWidth = width.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          styles.progressBarFill,
          { width: animatedWidth, backgroundColor: color }
        ]}
      />
    </View>
  );
};

export default function PollsScreen() {
  let [pollsData, setPollsData] = useState(initialPollsData);
  const [userVotes, setUserVotes] = useState({}); 
  let [suggestion, setSuggestion] = useState("");
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
  };

  const handleVote = (pollId, optionId) => {
    if (userVotes[pollId]) {
      showToast("You've already voted on this poll!", 'warning');
      return;
    }

    setPollsData(prevPolls =>
      prevPolls.map(poll => {
        if (poll.id === pollId) {
          return {
            ...poll,
            totalVotes: poll.totalVotes + 1,
            options: poll.options.map(option =>
              option.id === optionId
                ? { ...option, votes: option.votes + 1 }
                : option
            )
          };
        }
        return poll;
      })
    );

    setUserVotes({ ...userVotes, [pollId]: optionId });

    setTimeout(() => {
      showToast("Thank you for voting! Your voice matters.", 'success');
    }, 300);
  };

  const handleSubmitSuggestion = () => {
    if (suggestion.trim() === "") {
      showToast("Please enter a suggestion before submitting!", 'warning');
      return;
    }

    showToast("Thank you for your suggestion! We'll review it soon.", 'success');
    setSuggestion("");
  };

  const renderPollOption = (poll, option, isVoted, userSelectedId) => {
    const percentage = poll.totalVotes > 0
      ? Math.round((option.votes / poll.totalVotes) * 100)
      : 0;

    const isUserChoice = userSelectedId === option.id;
    const showResults = isVoted;

    return (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.pollOption,
          isUserChoice && styles.pollOptionSelected,
          isVoted && styles.pollOptionVoted
        ]}
        onPress={() => !isVoted && handleVote(poll.id, option.id)}
        disabled={isVoted}
        activeOpacity={0.7}
      >
        <View style={styles.optionContent}>
          <Text style={styles.optionEmoji}>{option.emoji}</Text>
          <View style={styles.optionTextContainer}>
            <Text style={[
              styles.optionLabel,
              isUserChoice && styles.optionLabelSelected
            ]}>
              {option.label}
              {isUserChoice && " ✓"}
            </Text>
            {showResults && (
              <View style={styles.optionStats}>
                <Text style={styles.optionVotes}>{option.votes} votes</Text>
                <Text style={styles.optionPercentage}>{percentage}%</Text>
              </View>
            )}
          </View>
        </View>
        {showResults && (
          <ProgressBar percentage={percentage} color={isUserChoice ? colors.accent : colors.border} />
        )}
      </TouchableOpacity>
    );
  };

  const renderPoll = (poll) => {
    const userVotedOption = userVotes[poll.id];
    const hasVoted = !!userVotedOption;

    return (
      <View key={poll.id} style={styles.pollCard}>
        <View style={styles.pollHeader}>
          <View style={styles.pollHeaderTop}>
            <Text style={styles.pollQuestion}>{poll.question}</Text>
          </View>
          <View style={styles.pollMeta}>
            <Text style={styles.pollMetaText}>
              {poll.totalVotes} total votes
            </Text>
            <Text style={styles.pollMetaText}>
              Ends {poll.endDate}
            </Text>
          </View>
        </View>

        <View style={styles.pollOptions}>
          {poll.options.map((option) =>
            renderPollOption(poll, option, hasVoted, userVotedOption)
          )}
        </View>

        {hasVoted && (
          <View style={styles.votedBanner}>
            <Text style={styles.votedBannerText}>
              ✓ You voted on this poll
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast({ ...toast, visible: false })}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Polls</Text>
        <Text style={styles.headerSubtitle}>
          Help us improve the mess menu
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pollsContainer}>
          {pollsData.map((poll) => renderPoll(poll))}
        </View>

        <View style={styles.suggestionsCard}>
          <View style={styles.suggestionsHeader}>
            <Text style={styles.suggestionsEmoji}>💡</Text>
            <Text style={styles.suggestionsTitle}>Have a Suggestion?</Text>
          </View>
          <Text style={styles.suggestionsSubtitle}>
            Share your ideas to improve the mess menu
          </Text>
          <TextInput
            style={styles.suggestionInput}
            placeholder="Type your suggestion here..."
            placeholderTextColor={colors.textMuted}
            value={suggestion}
            onChangeText={setSuggestion}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={[
              styles.suggestionSubmitButton,
              suggestion.trim() === "" && styles.suggestionSubmitButtonDisabled
            ]}
            onPress={handleSubmitSuggestion}
            activeOpacity={0.8}
          >
            <Text style={styles.suggestionSubmitButtonText}>
              Submit Suggestion
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoEmoji}>💬</Text>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Your Voice Matters</Text>
            <Text style={styles.infoText}>
              Vote on polls to help us make decisions about the mess menu and services.
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
  pollsContainer: {
    padding: spacing(3),
    gap: spacing(3),
  },
  pollCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing(3),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: spacing(2.5),
  },
  pollHeader: {
    marginBottom: spacing(2.5),
    paddingBottom: spacing(2),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pollHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing(2),
  },
  pollQuestion: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    flex: 1,
    marginRight: spacing(2),
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  statusBadge: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(0.8),
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusBadgeActive: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
  },
  statusBadgeEnded: {
    backgroundColor: "#FFEBEE",
    borderColor: "#EF5350",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
  pollMeta: {
    flexDirection: "row",
    gap: spacing(3),
    flexWrap: "wrap",
  },
  pollMetaText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: "600",
  },
  pollOptions: {
    gap: spacing(2),
  },
  pollOption: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing(2.5),
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pollOptionSelected: {
    borderColor: colors.accent,
    backgroundColor: "#FFF9F0",
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  pollOptionVoted: {
    backgroundColor: colors.surface,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing(0.8),
  },
  optionEmoji: {
    fontSize: 32,
    marginRight: spacing(2),
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing(0.5),
    letterSpacing: -0.2,
  },
  optionLabelSelected: {
    color: colors.accent,
    fontWeight: "800",
  },
  optionStats: {
    flexDirection: "row",
    gap: spacing(2),
    alignItems: "center",
  },
  optionVotes: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: "600",
  },
  optionPercentage: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: "800",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: spacing(1.2),
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  votedBanner: {
    marginTop: spacing(2.5),
    paddingVertical: spacing(1.5),
    paddingHorizontal: spacing(2.5),
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  votedBannerText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E7D32",
  },
  suggestionsCard: {
    backgroundColor: "#FFF9F0",
    marginHorizontal: spacing(3),
    marginTop: spacing(1),
    marginBottom: spacing(2),
    padding: spacing(3),
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  suggestionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing(1),
  },
  suggestionsEmoji: {
    fontSize: 32,
    marginRight: spacing(1.5),
  },
  suggestionsTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000000",
    letterSpacing: -0.4,
  },
  suggestionsSubtitle: {
    fontSize: 15,
    color: "#2A2A2A",
    marginBottom: spacing(2.5),
    fontWeight: "600",
    lineHeight: 20,
  },
  suggestionInput: {
    backgroundColor: "#F8F8F8",
    color: "#000000",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    padding: spacing(2.5),
    fontSize: 16,
    minHeight: 110,
    marginBottom: spacing(2.5),
    fontWeight: "500",
  },
  suggestionSubmitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing(1.8),
    borderRadius: 12,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  suggestionSubmitButtonDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  suggestionSubmitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#FFF9F0",
    marginHorizontal: spacing(3),
    marginTop: spacing(1),
    marginBottom: spacing(3),
    padding: spacing(3),
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: "center",
    shadowColor: colors.accent,
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
    color: "#1A1A1A",
    marginBottom: spacing(0.8),
    letterSpacing: -0.2,
  },
  infoText: {
    fontSize: 14,
    color: "#4A4A4A",
    lineHeight: 20,
    fontWeight: "500",
  },
});


