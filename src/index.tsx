import { AuthContextProvider } from "./context/AuthContext";
import RootStackNav from "./navigation/RootStackNavigator";

export default function App() {
  return (
    <AuthContextProvider>
      <RootStackNav />
    </AuthContextProvider>
  );
}
