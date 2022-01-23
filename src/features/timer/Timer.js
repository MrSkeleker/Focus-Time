import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Vibration, Platform } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import { Countdown } from "../../components/Countdown";
import { RoundedButton } from "../../components/RoundedButton";
import { Timing } from "./Timing";
import { colors } from "../../utils/colors";
import { fontSizes, spacing } from "../../utils/sizes";
import { platforms } from "../../utils/platforms";

const DEFAULT_TIME = 0.1;
export const Timer = (props) => {
  useKeepAwake();
  const { focusSubject, handleFinish, handleCancel } = props;
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const interval = useRef(null);

  const vibrate = () => {
    interval.current = setInterval(() => Vibration.vibrate(), 1000);
    setTimeout(() => clearInterval(interval.current), 10000);
  };

  const handleProgress = (progress) => {
    setProgress(progress);
  };

  const handleChangeTime = (minutes) => setMinutes(minutes);

  const handleEnd = () => {
    vibrate();
  };

  useEffect(() => {
    setIsStarted(false);
    setProgress(1);
  }, [minutes]);

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
      if (progress === 0) {
        handleFinish();
      }
    }
  }, [isStarted]);

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          duration={minutes}
          isPaused={!isStarted}
          handleProgress={handleProgress}
          handleEnd={handleEnd}
        />
      </View>
      <View style={{ flex: 0.1, paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.md }}>
        <ProgressBar
          progress={progress}
          style={{ height: 10 }}
          color={colors.lightBlue}
        />
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.actions}>
          <Timing handleChangeTime={handleChangeTime} />
        </View>
        <View style={styles.actions}>
          {isStarted ? (
            <RoundedButton
              title={progress === 0 ? "Finish" : "Pause"}
              handlePress={() => setIsStarted(false)}
            />
          ) : (
            <RoundedButton
              title={progress === 1 ? "Start" : "Resume"}
              handlePress={() => setIsStarted(true)}
            />
          )}
        </View>
        <View style={styles.clearSubject}>
          <RoundedButton
            title="-"
            size={50}
            handlePress={() => handleCancel()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
    fontSize: fontSizes.md,
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "700",
    fontSize: fontSizes.lg,
  },
  countdown: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  actionsContainer: {
    flex: 0.65,
  },
  actions: {
    flex: 0.45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.sm,
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
