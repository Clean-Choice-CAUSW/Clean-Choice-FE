import "@/SidePanel.css";

import { useEffect } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { PageState } from "./@types/page";
import Sidebar from "./components/Sidebar";
import AnalysisPage from "./pages/AnalysisPage";
import CartPage from "./pages/BasketPage";
import ComparePage from "./pages/ComparePage";
import CustomPage from "./pages/CustomPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { fetchMe } from "./services/auth";
import { usePageState } from "./store/pageStateStore";
import userStore from "./store/userStore";

const App = () => {
  const { pageState, setPageState } = usePageState();
  const isAuth = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const { setUserState } = userStore();
  const signOut = useSignOut();

  useEffect(() => {
    if (
      !isAuth &&
      pageState !== PageState.LOGIN &&
      pageState !== PageState.REGISTER
    )
      setPageState(PageState.LOGIN);
    else if (isAuth && pageState === PageState.LOGIN)
      setPageState(PageState.ANALYSIS);
  }, [isAuth, pageState]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!authHeader) return;
      const res = await fetchMe(authHeader);
      if (!res) {
        alert("유저 정보를 불러올 수 없습니다. ");
        signOut();
        return;
      }
      setUserState(res);
    };

    if (isAuth && authHeader) {
      fetchUserInfo();
    }
  }, [isAuth, authHeader]);

  if (pageState === PageState.LOGIN) {
    return <LoginPage />;
  }

  if (pageState === PageState.REGISTER) {
    return <RegisterPage />;
  }

  return (
    <div className="App grid grid-cols-[1fr_80px]">
      <div className={`w-full overflow-y-auto bg-slate-50 p-1`}>
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
