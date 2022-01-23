import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { colors } from "../utils/colors";

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  const baseStyles = styles(size);
  const { title, handlePress, isDisabled } = props;

  return (
    <TouchableOpacity
      style={[baseStyles.radius, style, isDisabled && baseStyles.disabled]}
      onPress={handlePress}
    >
      <Text
        style={[baseStyles.text, textStyle, isDisabled && baseStyles.disabled]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      height: size,
      width: size,
      alignItems: "center",
      justifyContent: "center",
      borderColor: colors.white,
      borderWidth: 2,
    },
    text: {
      color: colors.white,
      fontSize: Math.max(size / 4.5, 23),
      textTransform: "uppercase",
    },
    disabled: {
      color: colors.lightBlue,
      borderColor: colors.lightBlue,
    },
  });
