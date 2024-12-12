import type { ProductMarketResponseDto } from "./product";

interface ShopBasketProductJoinResponseDto {
  id: number;
  shopBasketId: number;
  productMarketResponseDto: ProductMarketResponseDto;
  createdAt: string;
  updatedAt: string;
}

/**
 * @description [GET] /shop-basket/{shopBasketId}
 */
export interface BasketResponse {
  id: number;
  memberId: number;
  name: string;
  shopBasketProductJoinResponseDtoList: ShopBasketProductJoinResponseDto[];
  createdAt: string;
  updatedAt: string;
}
