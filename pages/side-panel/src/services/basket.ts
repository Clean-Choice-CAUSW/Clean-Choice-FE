import type { BasketResponse } from "@/@types/basket";
import myAxios from "./myAxios";

export const createBasket = async (basketName: string, authHeader: string) => {
  try {
    const res = await myAxios.post(
      "/shop-basket/create",
      {},
      {
        headers: {
          Authorization: authHeader,
          basketName,
        },
      },
    );

    if (res.status === 201) {
      return true;
    }
  } catch (error: any) {
    alert(error.message);
  }
  return false;
};

export const getBasketList = async (authHeader: string) => {
  try {
    const res = await myAxios.get("/shop-basket/list", {
      headers: {
        Authorization: authHeader,
      },
    });

    if (res.status === 200) {
      return res.data as BasketResponse[];
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
  return null;
};
