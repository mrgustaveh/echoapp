import { StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";

export const Divider = ({ style }) => {
  return <View style={[styles.container, style]} />;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.accent,
  },
});
