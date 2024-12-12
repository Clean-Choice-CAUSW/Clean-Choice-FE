const BeforeAnalysis = () => {
  return (
    <p className="text-xl">
      현재 페이지의 상품을 분석하려면
      <br />
      분석하기 버튼을 눌러 주세요!
    </p>
  );
};

// interface SummaryProps {
//   title: string;
//   price: number;
//   priceUnit: string;
//   image: string;
//   ingredients: {
//     name: string;
//   };
// }

const Summary = () => {
  return <div className="grid w-full grid-cols-[1fr_150xp] p-2"></div>;
};

export default function AnalysisPage() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <BeforeAnalysis />
      <Summary />
    </div>
  );
}
