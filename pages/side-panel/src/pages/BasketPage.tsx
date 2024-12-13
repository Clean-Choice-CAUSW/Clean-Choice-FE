import type { BasketResponse } from "@/@types/basket";
import type { ProductMarketResponseDto } from "@/@types/product";
import Basket from "@/components/basket/Basket";
import MarketProductButton from "@/components/product/MarketProductButton";
import { Button } from "@/components/ui/button";
import detectMarket from "@/lib/detectMarket";
import { createBasket } from "@/services/basket";
import myAxios from "@/services/myAxios";
import { useCallback, useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const NewBasketForm = ({ afterCreate }: { afterCreate: () => void }) => {
  const [name, setName] = useState("");
  const authHeader = useAuthHeader();
  if (!authHeader) return null;

  const handleCreateBasket = async () => {
    if (!name) {
      alert("장바구니 이름을 입력해주세요.");
      return;
    }
    try {
      console.log(authHeader);
      const res = await createBasket(name, authHeader);
      if (res) {
        alert("장바구니가 생성되었습니다.");
        setName("");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      afterCreate();
    }
  };

  return (
    <div className="flex h-[60px] w-full items-center justify-between border-b border-gray-300 px-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="장바구니 이름"
          className="input input-bordered h-[40px] w-[200px] text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-sm">장바구니</p>
      </div>
      <Button className="h-[36px] w-[80px]" onClick={handleCreateBasket}>
        생성하기
      </Button>
    </div>
  );
};

export default function CartPage() {
  const [basketList, setBasketList] = useState<BasketResponse[]>([]);
  const authHeader = useAuthHeader();
  const [products, setProducts] = useState<ProductMarketResponseDto[]>([]);
  const [openedBasketId, setOpenedBasketId] = useState<number | null>(null);
  const [recommendLoading, setRecommendLoading] = useState(false);

  const fetchBasketList = useCallback(async () => {
    try {
      const res = await myAxios.get("/shop-basket/list", {
        headers: {
          Authorization: authHeader,
        },
      });
      if (res.status === 200) {
        setBasketList(res.data);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }, [authHeader]);

  useEffect(() => {
    fetchBasketList();
  }, [authHeader]);

  useEffect(() => {
    const fetchRecommended = async () => {
      if (!openedBasketId) {
        if (products.length > 0) setProducts([]);
        return;
      }
      setRecommendLoading(true);
      try {
        const res = await myAxios.get(
          `/shop-basket/recommend/${openedBasketId}`,
          {
            headers: {
              Authorization: authHeader,
            },
          },
        );
        if (res.status === 200) {
          setProducts(res.data);
        }
      } finally {
        setRecommendLoading(false);
      }
    };
    fetchRecommended();
  }, [openedBasketId, authHeader]);

  return (
    <div className="h-screen w-full">
      <NewBasketForm afterCreate={fetchBasketList} />
      <div className="mt-2 flex h-[calc(100vh-280px)] flex-col gap-2 overflow-y-auto">
        {basketList.length === 0 && (
          <p className="text-center text-sm">아직 장바구니가 없습니다.</p>
        )}
        {basketList.map((basket) => (
          <Basket
            key={basket.id}
            basket={basket}
            afterAdd={fetchBasketList}
            onClick={() => {
              if (openedBasketId === basket.id) {
                setOpenedBasketId(null);
                return;
              }
              setOpenedBasketId(basket.id);
            }}
            isOpened={basket.id === openedBasketId}
          />
        ))}
      </div>
      <div className="h-[215px] w-full border-t border-gray-300 p-2">
        <div className="flex size-full flex-col gap-3">
          <p className="text-start text-lg">이런 제품은 어떠세요?</p>
          <div className="w-[calc(100vw-110px)] overflow-y-auto">
            <div className="flex gap-[12px]">
              {products.length === 0 && !recommendLoading && (
                <p className="text-sm">
                  장바구니 제목을 눌러 선택하시면 추천 상품을 보여드려요!
                </p>
              )}
              {recommendLoading && (
                <p className="z-50 animate-bounce text-sm">
                  어떤 제품을 추천해 드릴 지 고민중이에요...
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
      </div>
    </div>
  );
}
