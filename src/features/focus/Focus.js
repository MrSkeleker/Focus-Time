import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

import { RoundedButton } from "../../components/RoundedButton";
import { colors } from "../../utils/colors";
import { fontSizes, spacing } from "../../utils/sizes";

export const Focus = (props) => {
  const { addSubject } = props;
  const [inputValue, setInputValue] = useState("");
  const handleEdit = (event) => {
    const {
      nativeEvent: { text },
    } = event;
    setInputValue(text);
  };
  const handlePress = () => addSubject(inputValue);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What do you want to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} onChange={handleEdit} />
          <RoundedButton size={50} title="+" handlePress={handlePress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: "center",
    padding: spacing.md,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: "700",
    textAlign: "center",
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: spacing.lg,
  },
});
