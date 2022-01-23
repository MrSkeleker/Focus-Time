import { View, StyleSheet, FlatList, Text, SafeAreaView } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { fontSizes, spacing } from "../../utils/sizes";

const HistoryItem = ({ item, index }) => {
  const { subject, status } = item;
  return <Text style={styles.historyItem(status)}>{subject}</Text>;
};

export const FocusHistory = ({ focusHistory, handleClear }) => {
  const clearHistory = () => {
    handleClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've done so far:</Text>
            <FlatList
              style={{ flex: 1, width: "100%" }}
              contentContainerStyle={{ alignItems: "center" }}
              data={focusHistory}
              renderItem={HistoryItem}
              scrollEnabled={true}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={85}
                title="Clear"
                handlePress={clearHistory}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? colors.orange : colors.lightGreen,
    fontSize: fontSizes.md,
    padding: spacing.xs,
  }),
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    padding: spacing.sm,
  },
  clearContainer: {
    alignItems: "center",
    padding: spacing.md,
  },
});
