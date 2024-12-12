import type { BasketResponse } from "@/@types/basket";
import type { ProductMarketResponseDto } from "@/@types/product";
import detectMarket from "@/lib/detectMarket";
import { addProductToBasket, getBasketList } from "@/services/basket";
import { useAnalyzedProductStore } from "@/store/analyzedProductStore";
import { useSelectedBasketStore } from "@/store/selectedBasketStore";
import { SelectGroup } from "@radix-ui/react-select";
import { useCallback, useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import MarketProductButton from "../product/MarketProductButton";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectBasket() {
  const [products, setProducts] = useState<ProductMarketResponseDto[]>([]);
  const [basketList, setBasketList] = useState<BasketResponse[]>([]);
  const { selectedBasket, setSelectedBasket } = useSelectedBasketStore();
  const authHeader = useAuthHeader();
  const { analyzedProduct } = useAnalyzedProductStore();

  const fetchBasketList = useCallback(async () => {
    if (!authHeader) return;
    const data = await getBasketList(authHeader);
    if (data) {
      setBasketList(data);
      if (data.length > 0) {
        console.log(selectedBasket?.name);
        if (!selectedBasket) setSelectedBasket(data[0]);
        else
          setSelectedBasket(
            data.find((b) => b.id === selectedBasket.id) ?? data[0],
          );
      }
    }
  }, [authHeader]);

  useEffect(() => {
    fetchBasketList();
  }, []);

  useEffect(() => {
    if (!selectedBasket) return;
    console.log("here");
    setProducts(
      selectedBasket.shopBasketProductJoinResponseDtoList.map(
        (p) => p.productMarketResponseDto,
      ),
    );
  }, [selectedBasket, basketList]);

  if (!authHeader) return null;

  const handleAddProduct = async () => {
    if (!selectedBasket) {
      alert("장바구니를 선택해 주세요");
      return;
    }
    if (!analyzedProduct) {
      alert("분석된 상품이 없습니다. ");
      return;
    }
    if (
      await addProductToBasket(
        analyzedProduct.id,
        selectedBasket.id,
        authHeader,
      )
    ) {
      alert("상품이 추가되었습니다. ");
      fetchBasketList();
    }
  };

  return (
    <div className="flex size-full flex-col gap-3">
      <div className="flex h-[40px] items-center justify-between">
        <div className="flex h-[40px] items-center gap-2 text-lg">
          <Select
            value={selectedBasket?.id.toString()}
            onValueChange={(v) => {
              const basket = basketList.find((b) => b.id.toString() === v);
              if (basket) setSelectedBasket(basket);
            }}
          >
            <SelectTrigger className="h-[30px] w-[170px] overflow-x-auto whitespace-nowrap text-sm">
              <SelectValue placeholder="장바구니를 선택해 주세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {basketList.map((b) => (
                  <SelectItem value={b.id.toString()} key={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          장바구니
        </div>
        <Button className="h-[30px] w-[90px]" onClick={handleAddProduct}>
          현재 상품 담기
        </Button>
      </div>
      <div className="w-[calc(100vw-110px)] overflow-y-auto">
        <div className="flex gap-[12px]">
          {products.length === 0 && (
            <p className="text-center text-gray-500">
              {selectedBasket
                ? "장바구니가 비어있습니다. "
                : "장바구니를 선택해 주세요"}
            </p>
          )}
          {products.map((p) => {
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
    </div>
  );
}
