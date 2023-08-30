import { useEffect } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "../global/Divider";
import { useAuth } from "../../context/authctxt";
import { usenotification } from "../../context/notificationctx";
import { deleteaccount } from "../../utils/api/auth";
import { auth } from "../../firebase/config";
import { text, subtitle } from "../../constants/styles";
import { colors } from "../../constants/colors";

export const Account = ({ setshowacc }) => {
  const {
    showloadingnotification,
    showsuccessnotification,
    showerrnotification,
    hidenotification,
  } = usenotification();
  const { idToken, userUid } = useAuth();

  const onsignout = () => {
    showloadingnotification("sign out", "signing you out...");

    auth
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem("prevauth");
        showerrnotification("sign out", "you were signed out successfully");
      })
      .catch(() => {
        showerrnotification(
          "sign out",
          "unable to sign you out, please try again"
        );
      })
      .finally(() => {
        hidenotification();
      });
  };

  const ondeleteAccount = () => {
    showloadingnotification("account deletion", "deleting your account...");

    auth.currentUser
      .delete()
      .then(async () => {
        const { isok } = await deleteaccount({
          idtoken: idToken,
          useruid: userUid,
        });

        if (isok) {
          showsuccessnotification(
            "account deletion",
            "your account & data were deleted successfully"
          );
        }
      })
      .catch(() => {
        showerrnotification(
          "account deletion",
          "please sign in again to delete your account"
        );
      })
      .finally(() => {
        hidenotification();
      });
  };

  const onPressBack = () => {
    setshowacc(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressBack);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressBack);
    };
  }, []);

  return (
    <View style={styles.accctr}>
      <View style={styles.actionsctr}>
        <Text
          style={[
            subtitle,
            {
              paddingHorizontal: 8,
              marginVertical: 18,
            },
          ]}
        >
          Account Deletion
        </Text>

        <Text
          style={[
            text,
            {
              paddingHorizontal: 8,
              marginBottom: 18,
            },
          ]}
        >
          By pressing Ok, you will erase your account and its associated data (
          account details, prompts & any generated audio ) ?
        </Text>

        <Text
          style={[
            subtitle,
            {
              marginBottom: 34,
              paddingHorizontal: 8,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              textDecorationColor: colors.lineclr,
            },
          ]}
          onPress={onsignout}
        >
          Sign out instead
        </Text>
        <Divider />
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.pressable, { width: "35%" }]}
            onPress={() => setshowacc(false)}
          >
            <Text style={text}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pressable, { width: "60%" }]}
            onPress={ondeleteAccount}
          >
            <Text style={text}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accctr: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    backgroundColor: colors.alertclr,
  },
  actionsctr: {
    width: "96%",
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 4,
    alignSelf: "center",
    backgroundColor: colors.accent,
  },
  actions: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressable: {
    padding: 8,
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
