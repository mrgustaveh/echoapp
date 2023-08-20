import { StyleSheet, View, TextInput } from "react-native";
import { ClaritySearch } from "../../assets/icons/icons";
import { colors } from "../../constants/colors";
import { text } from "../../constants/styles";

export const SearchInput = ({ searchtxt, setsearchtxt, onsearch }) => {
  const { text } = colors;

  return (
    <View style={styles.container}>
      <ClaritySearch />
      <TextInput
        autoFocus
        autoCorrect={false}
        value={searchtxt}
        onChangeText={(text) => setsearchtxt(text)}
        placeholder="search my audio ( title or content ) ..."
        placeholderTextColor={text}
        style={styles.input}
        onKeyPress={onsearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accent,
    marginTop: 8,
    marginHorizontal: 8,
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 4,
  },
  input: {
    ...text,
    marginLeft: 6,
    textAlignVertical: "center",
    width: "92%",
  },
});
