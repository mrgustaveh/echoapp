import { StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";

export const Divider = ({ style }) => {
  return <View style={[styles.container, style]} />;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 0.5,
    backgroundColor: colors.accent,
  },
});
