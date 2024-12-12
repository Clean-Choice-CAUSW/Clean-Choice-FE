interface BanedIngredientInfoResponseDto {
  id: number;
  ingredientId: number;
  banType: "OLD_CAUTION" | "PREGNANT_BANED";
  banTypeDescription: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CombineUseBanedIngredientInfoResponseDto {
  id: number;
  ingredientId: number;
  ingredientEnglishName: string;
  ingredientKoreanName: string;
  combineIngredientId: number;
  combineIngredientEnglishName: string;
  combineIngredientKoreanName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface IngredientResponseDto {
  id: number;
  englishCategory: string;
  koreanCategory: string;
  englishName: string;
  koreanName: string;
  effectiveness: string;
  isClearanceBaned: boolean;
  banedIngredientInfoResponseDtoList: BanedIngredientInfoResponseDto[];
  combineUseBanedIngredientInfoResponseDtoList: CombineUseBanedIngredientInfoResponseDto[];
  createdAt: string;
  updatedAt: string;
}

interface ProductIngredientJoinResponseDto {
  id: number;
  productId: number;
  ingredientResponseDto: IngredientResponseDto;
  servingSize: number;
  servingUnit: string;
  amountPerServing: number;
  amountPerServingUnit: string;
  dailyValuePerServing: number;
  englishDailyValueTargetGroup: string;
  koreanDailyValueTargetGroup: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductLabelStatementResponseDto {
  id: number;
  productId: number;
  statementType:
    | "BRANDING_STATEMENT" // 브랜딩 문구
    | "STATEMENT_OF_IDENTITY" // 식품의 명칭
    | "FORMULATION" // 성분
    | "PRECAUTIONS" // 주의사항
    | "PRODUCT_OR_VERSION_CODE" // 제품 버전 코드
    | "SEAL_SYMBOLS" // 인증 로고
    | "SUGGESTED_USE" // 사용방법
    | "OTHER";
  statementTypeStringValue: string;
  englishStatement: string;
  koreanStatement: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponseDto {
  id: number;
  dsldId: number;
  dsldUrl: string;
  name: string;
  productIngredientJoinResponseDtoList: ProductIngredientJoinResponseDto[];
  brandName: string;
  madeInCountry: string;
  englishNetContent: string;
  koreanNetContent: string;
  servingSize: string;
  englishProductType: string;
  koreanProductType: string;
  englishSupplementForm: string;
  koreanSupplementForm: string;
  englishSuggestedUse: string;
  koreanSuggestedUse: string;
  englishOtherIngredients: string;
  koreanOtherIngredients: string;
  productLabelStatementResponseDtoList: ProductLabelStatementResponseDto[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductMarketResponseDto {
  id: number;
  productResponseDTO: ProductResponseDto;
  url: string;
  price: number;
  priceUnit: string;
  analyzeType: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyzeRequest {
  url: string;
  productName: string;
  brandName: string;
  imageUrl: string;
  price: number;
  priceUnit: string;
}

export type Market = "AMAZON" | "IHERB" | "GNC" | "ETC";
