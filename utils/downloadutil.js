import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export async function downloadmedia({ URL }) {
  let filesaved = false;

  const downloadresumable = FileSystem.createDownloadResumable(
    URL,
    FileSystem.documentDirectory + "echo.mp3",
    {}
  );

  try {
    const { uri } = await downloadresumable.downloadAsync();
    await MediaLibrary.saveToLibraryAsync(uri);
    filesaved = true;

    return { filesaved };
  } catch (e) {}
}
