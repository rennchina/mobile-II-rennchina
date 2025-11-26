import { Slot } from "expo-router";
import { DatabaseProvider } from "../database";

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <Slot />
    </DatabaseProvider>
  );
}
