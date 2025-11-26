import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <SQLiteProvider
      databaseName="Listadb"
      assetSource={{ assetId: require("./assets/Lista.db") }}
    >
      {children}
    </SQLiteProvider>
  );
}
