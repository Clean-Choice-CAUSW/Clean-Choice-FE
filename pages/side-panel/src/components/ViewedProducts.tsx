import type { ProductMarketResponseDto } from "@/@types/product";
import detectMarket from "@/lib/detectMarket";
import { fetchViewRecord } from "@/services/product";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import MarketProductButton from "./product/MarketProductButton";

export default function ViewedProducts() {
  const [products, setProducts] = useState<ProductMarketResponseDto[]>([]);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetch = async () => {
      if (!authHeader) return;
      const data = await fetchViewRecord(authHeader);
      setProducts(data);
    };
    fetch();
  }, [authHeader]);

  if (!authHeader) return null;

  return (
    <div className="flex size-full flex-col gap-3">
      <p className="text-start text-lg">최근 살펴 본 상품</p>
      <div className="w-[calc(100vw-110px)] overflow-y-auto">
        <div className="flex gap-[12px]">
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
