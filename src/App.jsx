import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { AuthenticatedApp } from "./authenticated-app";
import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "./unauthenticated-app";

export function Home() {
  const { user } = useAuth();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider>
        <SessionProvider>
          <Header />
          <LoadingGateAuth>
            <Home />
          </LoadingGateAuth>
        </SessionProvider>
      </AuthProvider> */}
    </QueryClientProvider>
  );
}

export const LoadingGateAuth = ({ children }) => {
  const { isLoadedAuth } = useAuth();

  return isLoadedAuth ? (
    <>{children}</>
  ) : (
    <div className="flex flex-col items-center mt-10">
      {/* <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" /> */}
    </div>
  );
};

export const Header = () => {
  return (
    <div className="flex flex-col items-center">
      {/* <img src="/valetlogo.png" alt="VALET" className="h-[10vh] object-cover" /> */}
      <hr className="w-full border-t border-gray-200" />
    </div>
  );
};

export default App;
