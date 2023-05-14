import { StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";

export const Divider = ({ style }) => {
  return <View style={[styles.container, style]} />;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "rgba(25, 30, 35, 0.7)",
  },
});
