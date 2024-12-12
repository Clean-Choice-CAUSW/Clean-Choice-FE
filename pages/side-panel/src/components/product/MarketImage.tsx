import type { Market } from "@/@types/product";

interface MarketImageProps {
  imageSrc: string;
  market: Market;
}

export default function MarketImage({ imageSrc, market }: MarketImageProps) {
  return (
    <div className="relative w-[150px] p-[150px]">
      <img src={imageSrc} alt={market} className="size-[150px]" />
      {market !== "ETC" && (
        <img
          src={`${market.toLowerCase}.svg`}
          alt={market}
          className="absolute right-[7px] top-[7px]"
        />
      )}
    </div>
  );
}
