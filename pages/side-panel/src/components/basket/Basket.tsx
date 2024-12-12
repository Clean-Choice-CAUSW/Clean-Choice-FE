import type { BasketResponse } from "@/@types/basket";
import { addProductToBasket } from "@/services/basket";
import { useAnalyzedProductStore } from "@/store/analyzedProductStore";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import detectMarket from "../../lib/detectMarket";
import MarketProductButton from "../product/MarketProductButton";
import { Button } from "../ui/button";

export default function Basket({
  basket,
  afterAdd,
}: {
  basket: BasketResponse;
  afterAdd: () => void;
}) {
  const [isOpened, setIsOpened] = useState(false);
  const handleToggle = () => setIsOpened(!isOpened);
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

  return (
    <div className="flex w-[calc(100vw-110px)] flex-col border-b border-gray-300 px-[25px]">
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
      </div>
    </div>
  );
}
