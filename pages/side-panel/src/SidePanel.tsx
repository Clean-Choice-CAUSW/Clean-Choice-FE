import '@/SidePanel.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { useState } from 'react';
import { PageState } from './@types/page';
import Sidebar from './components/Sidebar';
import AnalysisPage from './pages/AnalysisPage';
import CartPage from './pages/CartPage';
import ComparePage from './pages/ComparePage';
import CustomPage from './pages/CustomPage';
import LoginPage from './pages/LoginPage';

const SidePanel = () => {
  const [pageState, setPageState] = useState<PageState>(PageState.LOGIN);

  if (pageState === PageState.LOGIN) {
    return (
      <LoginPage
        onLogin={() => {
          setPageState(PageState.ANALYSIS);
        }}
      />
    );
  }

  return (
    <div className="App grid grid-cols-[1fr_80px]">
      <div className={`w-full bg-slate-50 p-1`}>
        {pageState === PageState.ANALYSIS && <AnalysisPage />}
        {pageState === PageState.CART && <CartPage />}
        {pageState === PageState.COMPARE && <ComparePage />}
        {pageState === PageState.CUSTOM && <CustomPage />}
      </div>
      <Sidebar currentPageState={pageState} setPageState={setPageState} />
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
