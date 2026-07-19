import { PortalHost } from "@/components/primitives/portal";
import { Stack } from "expo-router";
import "../locales/i18n"; //Add this line to your main.tsx

export default function RootLayout() {
  return (
    <>
      <Stack />
      <PortalHost />
    </>
  );
}
