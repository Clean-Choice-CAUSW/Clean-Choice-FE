import "@/SidePanel.css";
import { withErrorBoundary, withSuspense } from "@extension/shared";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import App from "./App";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "http:",
});

const SidePanel = () => {
  return (
    <AuthProvider store={store}>
      <App />
    </AuthProvider>
  );
};

export default withErrorBoundary(
  withSuspense(SidePanel, <div> Loading ... </div>),
  <div> Error </div>,
);
