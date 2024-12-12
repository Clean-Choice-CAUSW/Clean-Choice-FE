import type { Market } from "@/@types/product";

interface MarketImageProps {
  imageSrc: string;
  market: Market;
  size: number;
}

export default function MarketImage({
  imageSrc,
  market,
  size,
}: MarketImageProps) {
  return (
    <div className={`relative`} style={{ width: size, height: size }}>
      <img
        src={imageSrc}
        alt={market}
        className={"rounded-md border border-gray-300 object-scale-down"}
        style={{
          width: size,
          height: size,
        }}
      />
      {market !== "ETC" && (
        <img
          src={`image/market/${market.toLowerCase()}.svg`}
          alt={market}
          className="absolute right-[7px] top-[7px]"
        />
      )}
    </div>
  );
}
