import type { AnalyzeResponseDto, Market } from "@/@types/product";
import { useAnalyzedProductStore } from "@/store/analyzedProductStore";
import type { ProductMarketResponseDto } from "../../@types/product";
import MarketImage from "./MarketImage";

interface MarketProductButtonProps {
  url: string;
  market: Market;
  imageSrc: string;
  name: string;
  onSelect?: () => void;
  borderColor?: string;
  productMarketResponseDto?: ProductMarketResponseDto;
}

export default function MarketProductButton({
  url,
  market,
  imageSrc,
  name,
  onSelect,
  borderColor,
  productMarketResponseDto,
}: MarketProductButtonProps) {
  const { setAnalyzedProduct } = useAnalyzedProductStore();

  return (
    <button
      className={`flex flex-col items-center gap-2 rounded-md border-2 ${borderColor ? ` ${borderColor}` : "border-transparent"}`}
      onClick={
        onSelect
          ? onSelect
          : () => {
              window.open(url);
              productMarketResponseDto &&
                setAnalyzedProduct(
                  productMarketResponseDto as AnalyzeResponseDto,
                );
            }
      }
    >
      <MarketImage imageSrc={imageSrc} market={market} size={130} />
      <p className="text-sm">
        {name.length >= 16 ? `${name.slice(0, 15)}...` : name}
      </p>
    </button>
  );
}
