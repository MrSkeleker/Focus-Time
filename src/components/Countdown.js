import { useState, useEffect, useRef } from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
  duration,
  isPaused,
  handleProgress,
  handleEnd,
}) => {
  const [time, setTime] = useState(minutesToMillis(duration));
  const interval = useRef(null);

  const countDown = () => {
    setTime((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      return time - 1000;
    });
  };

  useEffect(() => {
    if (!isPaused) {
      interval.current = setInterval(() => {
        countDown();
      }, 1000);
    }
    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    handleProgress(time / minutesToMillis(duration));
    if (time === 0) {
        handleEnd();
    }
  }, [time]);

  useEffect(() => {
    setTime(minutesToMillis(duration));
  }, [duration]);

  const minutes = Math.floor(time / 1000 / 60) % 60;
  const seconds = Math.floor(time / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minutes)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "700",
    padding: spacing.lg,
    color: colors.white,
    backgroundColor: colors.transparentBlue,
  },
});
