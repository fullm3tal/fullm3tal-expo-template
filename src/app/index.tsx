import { useAppTheme } from "@/theme/theming/useAppTheme";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

const INDICATOR_STYLE: ViewStyle = {
  height: 5,
  width: 5,
  backgroundColor: "red",
  borderRadius: 50,
  position: "absolute",
  left: -10,
  top: 6,
};

export default function Index() {
  const { colors, fonts } = useAppTheme();

  return (
    <View style={{ flex: 1 }}>
      <Text>Hello Worldsss</Text>
      <Text style={{ backgroundColor: colors.primary }}>
        {colors.primary.toString()}
      </Text>
      <Text style={{ backgroundColor: colors.secondary, ...fonts.bodySmall }}>
        {colors.secondary.toString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8, // gap-2
    borderRadius: 2, // rounded-sm
    paddingHorizontal: 8, // px-2
    paddingVertical: 8, // py-2
    alignSelf: "stretch",
  },
});
