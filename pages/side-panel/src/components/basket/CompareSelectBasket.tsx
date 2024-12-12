import type { BasketResponse } from "@/@types/basket";
import type { ProductMarketResponseDto } from "@/@types/product";
import detectMarket from "@/lib/detectMarket";
import { addProductToBasket, getBasketList } from "@/services/basket";
import { useAnalyzedProductStore } from "@/store/analyzedProductStore";
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

export default function CompareSelectBasket({
  selectedProduct,
  setSelectedProduct,
}: {
  selectedProduct: ProductMarketResponseDto[] | null;
  setSelectedProduct: (product: ProductMarketResponseDto[]) => void;
}) {
  const [products, setProducts] = useState<ProductMarketResponseDto[]>([]);
  const [basketList, setBasketList] = useState<BasketResponse[]>([]);
  const [selectedBasket, setSelectedBasket] = useState<BasketResponse>();
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
    if (selectedBasket) {
      setProducts(
        selectedBasket.shopBasketProductJoinResponseDtoList.map(
          (p) => p.productMarketResponseDto,
        ),
      );
    }
  }, [authHeader]);

  useEffect(() => {
    fetchBasketList();
    setSelectedProduct([]);
  }, []);

  useEffect(() => {
    setSelectedProduct([]);
    if (!selectedBasket) return;
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
      setSelectedProduct([]);
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
            const selectedIdx = selectedProduct?.findIndex(
              (sp) => sp.id === p.id,
            );
            let borderColor = "";
            if (selectedIdx === 0) borderColor = "border-blue-600";
            else if (selectedIdx === 1) borderColor = "border-red-600";
            return (
              <MarketProductButton
                key={p.id}
                url={p.url}
                imageSrc={p.imageUrl}
                market={detectMarket(p.url)}
                name={p.productResponseDto.name}
                onSelect={() => {
                  if (!selectedProduct || selectedProduct.length === 0) {
                    setSelectedProduct([p]);
                    return;
                  }
                  if (selectedProduct.find((sp) => sp.id === p.id)) {
                    setSelectedProduct(
                      selectedProduct.filter((sp) => sp.id !== p.id),
                    );
                    return;
                  }
                  if (selectedProduct.length === 2) {
                    setSelectedProduct([selectedProduct[1], p]);
                  }
                  if (selectedProduct.length === 1) {
                    setSelectedProduct([...selectedProduct, p]);
                  }
                }}
                borderColor={borderColor}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
