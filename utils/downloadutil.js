import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export async function downloadmedia({ URL, title }) {
  const downloadresumable = FileSystem.createDownloadResumable(
    URL,
    FileSystem.documentDirectory + `${title}.mpeg`,
    {}
  );

  try {
    const { uri } = await downloadresumable.downloadAsync();
    await MediaLibrary.saveToLibraryAsync(uri);
  } catch (e) {}
}
