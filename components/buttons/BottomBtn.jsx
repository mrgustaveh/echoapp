import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { subtitle } from "../../constants/styles";
import { colors } from "../../constants/colors";

export const BottomBtn = ({ title, icon, onclick, iconfirst }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { flexDirection: iconfirst ? "row-reverse" : "row" },
      ]}
      onPress={onclick}
    >
      <Text style={[subtitle, styles.title]}>{title}</Text>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    width: "94%",
    alignSelf: "center",
    marginHorizontal: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 32,
    backgroundColor: colors.accent,
  },
  title: {
    textTransform: "capitalize",
  },
});
