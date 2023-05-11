import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { SearchIcon } from "../../assets/icons/icons";
import { colors } from "../../constants/colors";
import { subtitle } from "../../constants/styles";

export const SearchInput = () => {
  const [searchtxt, setsearchtxt] = useState("");

  const { textlight } = colors;

  return (
    <View style={styles.container}>
      <SearchIcon />
      <TextInput
        autoFocus
        autoCorrect={false}
        value={searchtxt}
        onChangeText={(text) => setsearchtxt(text)}
        placeholder="search my audio..."
        placeholderTextColor={textlight}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accentlight,
    borderRadius: 8,
    marginTop: 8,
    marginHorizontal: 8,
  },
  input: {
    ...subtitle,
    marginLeft: 8,
    maxWidth: "92%",
  },
});
