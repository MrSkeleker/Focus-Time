import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { colors } from "../../utils/colors";

export const Timing = ({ handleChangeTime }) => {
  const [activeTiming, setActiveTiming] = useState(null);
  const timingOptions = [5, 10, 15];

  useEffect(() => {
    if (activeTiming !== null) {
      handleChangeTime(activeTiming);
    }
  }, [activeTiming]);

  return (
    <>
      {timingOptions.map((option) => (
        <View key={option} style={styles.timingButton}>
          <RoundedButton
            size={60}
            title={option}
            isDisabled={activeTiming === option}
            handlePress={() => setActiveTiming(option)}
          />
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: "center",
  },
  activeTiming: {
    color: colors.lightBlue,
  },
});
