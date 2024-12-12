import type { BasketResponse } from "@/@types/basket";
import { Button } from "@/components/ui/button";
import myAxios from "@/services/myAxios";
import { useCallback, useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const NewBasketForm = ({ afterCreate }: { afterCreate: () => void }) => {
  const [name, setName] = useState("");
  const authHeader = useAuthHeader();

  const handleCreateBasket = async () => {
    if (!name) {
      alert("장바구니 이름을 입력해주세요.");
      return;
    }
    try {
      console.log(authHeader);
      const res = await myAxios.post(
        "/shop-basket/create",
        {},
        {
          headers: {
            Authorization: authHeader,
            basketName: name,
          },
        },
      );
      if (res.status === 201) {
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

  return (
    <div className="h-screen w-full">
      <NewBasketForm afterCreate={fetchBasketList} />
      <div className="mt-2 flex flex-col gap-2">
        {basketList.length === 0 && (
          <p className="text-center text-sm">아직 장바구니가 없습니다.</p>
        )}
        {basketList.map((basket) => (
          <div
            key={basket.id}
            className="flex items-center justify-between border-b border-gray-300 p-2"
          >
            <p>{basket.name}</p>
            <p>{basket.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
