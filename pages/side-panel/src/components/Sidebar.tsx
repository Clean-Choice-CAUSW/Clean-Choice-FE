import { usePageState } from "@/store/pageStateStore";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { PageState } from "../@types/page";
import { AnalysisButton } from "./AnalysisButton";
import { Button } from "./ui/button";

const buttonEntities = [
  { label: "분석", pageState: PageState.ANALYSIS },
  { label: "장바구니", pageState: PageState.BASKET },
  { label: "비교", pageState: PageState.COMPARE },
  { label: "맞춤", pageState: PageState.CUSTOM },
];

const SidebarButton = ({
  label,
  onClick,
  isActive,
}: {
  label: string;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <button
      className={`size-[80px] text-[16px] font-bold ${isActive ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default function Sidebar() {
  const { pageState, setPageState: changePageState } = usePageState();
  const logout = useSignOut();

  return (
    <div className="flex flex-col items-center gap-2 gap-x-0 bg-blue-600 px-0 pt-[50px]">
      <AnalysisButton />
      <div className="flex h-full flex-col items-center">
        {buttonEntities.map(({ label, pageState: state }) => (
          <SidebarButton
            key={state}
            label={label}
            onClick={() => changePageState(state)}
            isActive={state === pageState}
          />
        ))}

        <Button
          className="w-[70px]"
          onClick={() => {
            logout();
            changePageState(PageState.LOGIN);
          }}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}
