import "@/SidePanel.css";

import { useEffect } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { PageState } from "./@types/page";
import Sidebar from "./components/Sidebar";
import AnalysisPage from "./pages/AnalysisPage";
import CartPage from "./pages/BasketPage";
import ComparePage from "./pages/ComparePage";
import CustomPage from "./pages/CustomPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { usePageState } from "./store/pageStateStore";

const App = () => {
  const { pageState, setPageState } = usePageState();
  const isAuth = useIsAuthenticated();

  useEffect(() => {
    if (!isAuth) setPageState(PageState.LOGIN);
    else if (pageState === PageState.LOGIN || pageState === PageState.REGISTER)
      setPageState(PageState.ANALYSIS);
  }, [isAuth, pageState]);

  if (pageState === PageState.LOGIN) {
    return <LoginPage />;
  }

  if (pageState === PageState.REGISTER) {
    return <RegisterPage />;
  }

  return (
    <div className="App grid grid-cols-[1fr_80px]">
      <div className={`w-full bg-slate-50 p-1`}>
        {pageState === PageState.ANALYSIS && <AnalysisPage />}
        {pageState === PageState.BASKET && <CartPage />}
        {pageState === PageState.COMPARE && <ComparePage />}
        {pageState === PageState.CUSTOM && <CustomPage />}
      </div>
      <Sidebar />
    </div>
  );
};

export default App;
