import { StyleSheet, TouchableOpacity, View } from "react-native";
import { PlayIcon, PauseIcon, DownloadIcon } from "../../assets/icons/icons";
import { colors } from "../../constants/colors";

export const Player = () => {
  return (
    <View style={styles.container}>
      <View style={styles.audioactions}>
        <TouchableOpacity>
          <PlayIcon />
        </TouchableOpacity>

        <TouchableOpacity>
          <PauseIcon />
        </TouchableOpacity>

        <TouchableOpacity>
          <DownloadIcon />
        </TouchableOpacity>
      </View>

      <View style={[styles.progress, { width: "60%" }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 80,
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.accentlight,
  },
  audioactions: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  progress: {
    height: 6,
    marginTop: 16,
    borderRadius: 6,
    backgroundColor: colors.textlight,
  },
});
