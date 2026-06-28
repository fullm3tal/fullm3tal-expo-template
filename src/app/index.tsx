import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View className="w-full max-w-sm items-center gap-4 px-6">
        <Text className="text-sm text-neutral-500">Home</Text>

        <Input placeholder="Type something..." className="bg-white" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Pressable className="flex-row items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-3 active:opacity-80">
              <Text className="text-base font-semibold text-neutral-900">
                Open dropdown
              </Text>
              <ChevronDown size={18} color="#111827" />
            </Pressable>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-56">
            <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onPress={() => {}}>
              <Text className="text-sm text-neutral-900">Profile</Text>
            </DropdownMenuItem>
            <DropdownMenuItem onPress={() => {}}>
              <Text className="text-sm text-neutral-900">Settings</Text>
            </DropdownMenuItem>
            <DropdownMenuItem onPress={() => {}}>
              <Text className="text-sm text-neutral-900">Sign out</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
