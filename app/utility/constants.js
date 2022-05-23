import { Dimensions } from "react-native";

export function ScreenWidth() {
  const width = Dimensions.get("window").width;
  console.info("width...", width);
  return 300;
}
