import type { Market, ProductMarketResponseDto } from "@/@types/product";
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
    const data = response.data as ProductMarketResponseDto;
    console.log(JSON.stringify(data));
  } catch (e: any) {
    alert(e.message);
  }
};
