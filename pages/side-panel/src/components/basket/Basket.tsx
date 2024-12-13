import type { BasketResponse } from "@/@types/basket";
import { addProductToBasket } from "@/services/basket";
import { createShopRecord } from "@/services/product";
import { useAnalyzedProductStore } from "@/store/analyzedProductStore";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import detectMarket from "../../lib/detectMarket";
import ClearanceTooltip from "../ClearanceTooltip";
import IngredientsTooltip from "../IngredientsTooltip";
import IngredientTag from "../IngredientTag";
import MarketImage from "../product/MarketImage";
import MarketProductButton from "../product/MarketProductButton";
import { Button } from "../ui/button";

export default function Basket({
  basket,
  afterAdd,
  isOpened,
  onClick,
}: {
  basket: BasketResponse;
  isOpened: boolean;
  afterAdd: () => void;
  onClick: () => void;
}) {
  const handleToggle = () => onClick();
  const products = basket.shopBasketProductJoinResponseDtoList;
  const authHeader = useAuthHeader();

  const { analyzedProduct } = useAnalyzedProductStore();

  if (!authHeader) return null;

  const handleAddProduct = async () => {
    if (!analyzedProduct) {
      alert("분석된 상품이 없습니다. ");
      return;
    }
    if (await addProductToBasket(analyzedProduct.id, basket.id, authHeader)) {
      alert("상품이 추가되었습니다. ");
      afterAdd();
    }
  };

  const rate = 1430.02;

  const buyConfirm = async (id: number) => {
    // 구매 확정
    if (await createShopRecord(id, authHeader)) {
      alert("구매 확정이 완료되었습니다.");
    }
  };

  return (
    <div className="flex w-[calc(100vw-110px)] flex-col border-b border-gray-300 px-[15px]">
      <div className="flex items-start justify-between">
        <button onClick={handleToggle} className="flex gap-2 text-lg">
          <p className="max-w-[170px] overflow-x-auto whitespace-nowrap font-bold">
            {basket.name}
          </p>{" "}
          장바구니
        </button>
        <Button className="h-[30px] w-[90px]" onClick={handleAddProduct}>
          현재 상품 담기
        </Button>
      </div>
      <div className="flex w-[calc(100vw-110px)] justify-start overflow-x-auto">
        {!isOpened && products.length === 0 && (
          <p className="text-gray-500">장바구니가 비어 있습니다.</p>
        )}
        {!isOpened && products.length > 0 && (
          <div className="w-[calc(100vw-110px)] overflow-y-auto">
            <div className="flex gap-[12px]">
              {products.length === 0 && (
                <p className="text-center text-gray-500">
                  {"장바구니가 비어있습니다. "}
                </p>
              )}
              {products.map(({ productMarketResponseDto: p }) => {
                if (!p.url) return null;
                return (
                  <MarketProductButton
                    key={p.id}
                    url={p.url}
                    imageSrc={p.imageUrl}
                    market={detectMarket(p.url)}
                    name={p.productResponseDto.name}
                  />
                );
              })}
            </div>
          </div>
        )}
        {isOpened && (
          <div className="flex flex-col gap-2">
            {products.map(({ productMarketResponseDto: p }) => {
              if (!p.url) return null;
              const ingredients =
                p.productResponseDto.productIngredientJoinResponseDtoList;
              const clearanceBannedList = ingredients.filter(
                (i) => i.ingredientResponseDto.isClearanceBaned,
              );
              return (
                <div
                  key={p.id}
                  className="flex items-start justify-between gap-[18px] border-b border-gray-300 pb-2"
                >
                  <div className="flex max-w-[327px] flex-col items-start">
                    <p className="mb-[10px] text-start text-lg">
                      {p.productResponseDto.name}
                    </p>
                    <Button
                      className="h-[40px] w-[80px] bg-blue-600 text-white"
                      onClick={async () => await buyConfirm(p.id)}
                    >
                      구매 확정
                    </Button>
                    <p className="text-lg">
                      {p.price}$ (약 {(p.price * rate).toFixed(2)} 원)
                    </p>
                    <IngredientsTooltip />
                    <div className="flex gap-[5px]">
                      {ingredients.map((i) => {
                        return (
                          <IngredientTag
                            key={i.id}
                            name={i.ingredientResponseDto.englishName}
                            description={i.ingredientResponseDto.effectiveness}
                            isClearanceBaned={
                              i.ingredientResponseDto.isClearanceBaned
                            }
                            bannedIngredientInfo={
                              i.ingredientResponseDto
                                .banedIngredientInfoResponseDtoList
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <ClearanceTooltip
                      clearanceBannedList={clearanceBannedList}
                    />
                    <MarketImage
                      imageSrc={p.imageUrl}
                      market={detectMarket(p.url)}
                      size={130}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
