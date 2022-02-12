import { useAuth } from "./context/auth-context";
import { AdminPanel } from "./views/AdminPanel";
import { UserPanel } from "./views/UserPanel";

export function AuthenticatedApp() {
  const { user } = useAuth();

  return user.email === "admin@gmail.com" ? <AdminPanel /> : <UserPanel />;
}
