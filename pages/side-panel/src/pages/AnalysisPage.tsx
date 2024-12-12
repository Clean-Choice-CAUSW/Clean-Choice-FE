import type { AnalyzeResponseDto } from "@/@types/product";
import SelectBasket from "@/components/basket/SelectBasket";
import ClearanceTooltip from "@/components/ClearanceTooltip";
import IngredientsTooltip from "@/components/IngredientsTooltip";
import IngredientTag from "@/components/IngredientTag";
import MarketImage from "@/components/product/MarketImage";
import ProductTable from "@/components/product/ProductTable";
import { Button } from "@/components/ui/button";
import ViewedProducts from "@/components/ViewedProducts";
import { createShopRecord } from "@/services/product";
import { useAnalyzedProductStore } from "@/store/analyzedProductStore";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const BeforeAnalysis = () => {
  return (
    <p className="text-xl">
      현재 페이지의 상품을 분석하려면
      <br />
      분석하기 버튼을 눌러 주세요!
    </p>
  );
};

const Analysis = ({ analyzed }: { analyzed: AnalyzeResponseDto }) => {
  const ingredients =
    analyzed.productResponseDto.productIngredientJoinResponseDtoList;
  const clearanceBannedList = ingredients.filter(
    (i) => i.ingredientResponseDto.isClearanceBaned,
  );
  const { name } = analyzed.productResponseDto;
  const { price } = analyzed;
  const authHeader = useAuthHeader();

  const rate = 1430.02;

  if (!authHeader) return null;

  const buyConfirm = async () => {
    // 구매 확정
    if (await createShopRecord(analyzed.id, authHeader)) {
      alert("구매 확정이 완료되었습니다.");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex max-h-[calc(100vh-430px)] flex-col overflow-y-auto border-b border-gray-300">
        {/* 상품 요약 */}
        <div className="flex items-start justify-between gap-[18px] border-b border-gray-300 p-[20px]">
          <div className="flex max-w-[327px] flex-col items-start">
            <p className="mb-[10px] text-start text-lg">{name}</p>
            <Button
              className="h-[40px] w-[80px] bg-blue-600 text-white"
              onClick={buyConfirm}
            >
              구매 확정
            </Button>
            <p className="text-lg">
              {price}$ (약 {(price * rate).toFixed(2)} 원)
            </p>
            <IngredientsTooltip />
            <div className="flex gap-[5px]">
              {ingredients.map((i) => {
                return (
                  <IngredientTag
                    key={i.id}
                    name={i.ingredientResponseDto.englishName}
                    description={i.ingredientResponseDto.effectiveness}
                    bannedIngredientInfo={
                      i.ingredientResponseDto.banedIngredientInfoResponseDtoList
                    }
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <ClearanceTooltip clearanceBannedList={clearanceBannedList} />
            <MarketImage
              imageSrc={analyzed.imageUrl}
              market="AMAZON"
              size={150}
            />
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="flex flex-col items-start gap-[9px] p-[10px]">
          <p className="text-sm font-bold">상세 정보</p>
          <ProductTable productResponseDto={analyzed.productResponseDto} />
        </div>
      </div>
      {/* 장바구니 */}
      <div className="h-[215px] w-full border-b border-gray-300">
        <SelectBasket />
      </div>
      {/* 최근 살펴본 상품 */}
      <div className="h-[215px] w-full">
        <ViewedProducts />
      </div>
    </div>
  );
};

export default function AnalysisPage() {
  const { analyzedProduct } = useAnalyzedProductStore();

  if (!analyzedProduct) {
    return (
      <div className="relative flex h-screen flex-col items-center justify-center">
        <BeforeAnalysis />
      </div>
    );
  }

  return <Analysis analyzed={analyzedProduct} />;
}
