import type { ColorValue } from "react-native";

export type StateOpacityKey = keyof typeof tokens.md.sys.state.opacity;

export type StateLayer = {
  color: ColorValue;
  opacity: number;
};
