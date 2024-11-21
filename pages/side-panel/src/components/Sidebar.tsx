import type { Dispatch, SetStateAction } from 'react';
import { PageState } from '../@types/page';

interface SidebarProps {
  currentPageState: PageState;
  setPageState: Dispatch<SetStateAction<PageState>>;
}

const buttonEntities = [
  { label: '분석', pageState: PageState.ANALYSIS },
  { label: '장바구니', pageState: PageState.CART },
  { label: '비교', pageState: PageState.COMPARE },
  { label: '맞춤', pageState: PageState.CUSTOM },
];

const SidebarButton = ({ label, onClick, isActive }: { label: string; onClick: () => void; isActive: boolean }) => {
  return (
    <button
      className={`h-[80px] w-full text-[16px] font-bold ${isActive ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default function Sidebar({ setPageState, currentPageState }: SidebarProps) {
  return (
    <div className="flex h-full flex-col items-center bg-blue-600 pt-[100px]">
      {buttonEntities.map(({ label, pageState }) => (
        <SidebarButton
          key={pageState}
          label={label}
          onClick={() => setPageState(pageState)}
          isActive={pageState === currentPageState}
        />
      ))}
    </div>
  );
}
