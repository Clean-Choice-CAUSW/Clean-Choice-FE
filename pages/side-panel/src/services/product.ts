import type {
  AnalyzeResponseDto,
  Market,
  ProductMarketResponseDto,
  ViewRecordResponse,
} from "@/@types/product";
import marketParser from "@/lib/marketParse";
import myAxios from "./myAxios";

export const analyzeProduct = async (
  url: string,
  market: Market,
  authHeader: string,
) => {
  if (market === "ETC") {
    // TODO : ETC market
    return;
  }
  try {
    const parsed = await marketParser[market](url);
    const response = await myAxios.post("/home/analyze", parsed, {
      headers: {
        Authorization: authHeader,
      },
    });
    const data = response.data as AnalyzeResponseDto;
    return data;
  } catch (e: any) {
    alert(e.message);
  }
  return null;
};

export const fetchViewRecord = async (
  authHeader: string,
): Promise<ProductMarketResponseDto[]> => {
  try {
    const response = await myAxios.get("/view-record/list", {
      headers: {
        Authorization: authHeader,
      },
    });
    const data = response.data as ViewRecordResponse;
    return data.map((v) => v.productMarketResponseDto);
  } catch (e: any) {
    throw new Error(e.message);
  }
  return [];
};

export const createShopRecord = async (
  productMarketId: number,
  authHeader: string,
) => {
  try {
    const response = await myAxios.post(
      "/shop-record/create",
      {},
      {
        headers: {
          Authorization: authHeader,
          productMarketId: productMarketId,
        },
      },
    );
    if (response.status === 201) {
      return true;
    }
  } catch (e: any) {
    alert(e.message);
  }
  return false;
};
