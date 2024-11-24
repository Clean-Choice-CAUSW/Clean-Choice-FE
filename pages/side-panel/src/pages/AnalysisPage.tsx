import { Button } from '@/components/ui/button';

const BeforeAnalysis = () => {
  return (
    <p className="text-xl">
      현재 페이지의 상품을 분석하려면
      <br />
      분석하기 버튼을 눌러 주세요!
    </p>
  );
};

const AnalysisButton = () => {
  return (
    <Button
      onClick={async () => {
        // get current main page's url
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        console.log(tab);
        if (tab) {
          alert(tab.url);
        }
      }}>
      분석하기
    </Button>
  );
};

export default function AnalysisPage() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <AnalysisButton />
      <BeforeAnalysis />
    </div>
  );
}
