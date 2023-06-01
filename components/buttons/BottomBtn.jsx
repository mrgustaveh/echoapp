import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { subtitle } from "../../constants/styles";
import { colors } from "../../constants/colors";

export const BottomBtn = ({ title, icon, btnDisabled, onclick, iconfirst }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          flexDirection: iconfirst ? "row-reverse" : "row",
          backgroundColor: btnDisabled ? colors.accentlight : colors.accent,
        },
      ]}
      disabled={btnDisabled}
      onPress={onclick}
    >
      <Text
        style={[
          subtitle,
          styles.title,
          { color: btnDisabled ? colors.textlight : colors.text },
        ]}
      >
        {title}
      </Text>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 8,
    width: "94%",
    alignSelf: "center",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderRadius: 32,
  },
  title: {
    textTransform: "capitalize",
  },
});
