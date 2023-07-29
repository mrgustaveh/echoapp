import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { text } from "../../constants/styles";
import { colors } from "../../constants/colors";

export const BottomBtn = ({ title, icon, btnDisabled, onclick, iconfirst }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          flexDirection: iconfirst ? "row-reverse" : "row",
        },
      ]}
      disabled={btnDisabled}
      onPress={onclick}
    >
      <Text style={[text, styles.title]}>{title}</Text>
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
    gap: 12,
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: colors.lineclr,
    backgroundColor: colors.accent,
  },
  title: {
    textTransform: "capitalize",
  },
});
