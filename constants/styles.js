import { colors } from "./colors";

export const container = {
  flex: 1,
  backgroundColor: colors.primary,
};

export const text = {
  fontSize: 12,
  fontFamily: "ops-light",
  color: colors.text,
};

export const subtitle = {
  fontSize: 12,
  fontFamily: "ops-regular",
  color: colors.text,
};

export const title = {
  fontSize: 16,
  fontFamily: "ops-regular",
  color: colors.text,
};

export const actions = {
  width: "100%",
  height: "100%",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-end",
};

export const downloadbtn = {
  width: 40,
  height: 40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: 4,
  marginHorizontal: 16,
  borderRadius: 32,
};

export const deletebtn = {
  padding: 8,
  marginTop: 32,
  marginHorizontal: 8,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderRadius: 6,
};
