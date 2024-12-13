import type { ProductMarketResponseDto } from "@/@types/product";
import type { IngredientResponseDto } from "./product.d";
interface BanedIngredientInfoResponseDto {
  id: number;
  ingredientId: number;
  banType:
    | "OLD_CAUTION"
    | "PREGNANT_BANED"
    | "PERIOD_CAUTION"
    | "VOLUME_CAUTION"
    | "AGE_BANED"
    | "DUPLICATE_EFFICACY";
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

export interface IngredientResponseDto {
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
  amountPerServing: string;
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
  productResponseDto: ProductResponseDto;
  imageUrl: string;
  url: string; // url에서 market 정보 추출
  price: number;
  priceUnit: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyzeResponseDto {
  id: number;
  productResponseDto: ProductResponseDto;
  imageUrl: string;
  url: string; // url에서 market 정보 추출
  price: number;
  priceUnit: string;
  analyzeType: "LLM_PARSED" | "DB_COSINE_DISTANCE";
  createdAt: string;
  updatedAt: string;
}

export interface AnalyzeRequest {
  url: string;
  productName: string;
  brandName: string;
  imageUrl: string;
  price: number | null;
  priceUnit: string | null;
  imageUrlList: string[];
  html: string;
}

export type Market = "AMAZON" | "IHERB" | "GNC" | "ETC";

export type ViewRecord = {
  id: number;
  memberId: number;
  productMarketResponseDto: ProductMarketResponseDto;
  createdAt: string;
  updatedAt: string;
};

export interface ViewRecordResponse extends Array<ViewRecord> {}

export type IntakeResponse = {
  id: number;
  memberId: number;
  ingredientResponseDto: IngredientResponseDto;
  fakeName: string;
  amount: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
};

export interface IntakeResponseDto extends Array<IntakeResponse> {}
