import type { ProductMarketResponseDto } from "@/@types/product";
import CompareSelectBasket from "@/components/basket/CompareSelectBasket";
import ProductTable from "@/components/product/ProductTable";
import { useState } from "react";

export default function ComparePage() {
  const [selectedProduct, setSelectedProduct] = useState<
    ProductMarketResponseDto[] | null
  >(null);

  return (
    <div className="h-screen w-full">
      <div className="h-[230px] border-b border-gray-300">
        <CompareSelectBasket
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </div>
      <div className="grid h-[calc(100vh-230px)] grid-rows-2">
        {selectedProduct && selectedProduct[0] && (
          <div className="flex h-[calc((100vh-230px)/2)] flex-col items-start overflow-y-auto border-b border-gray-300">
            <p className="text-sm font-bold text-blue-600">상세 정보</p>
            <ProductTable
              productResponseDto={selectedProduct[0].productResponseDto}
            />
          </div>
        )}
        {selectedProduct && selectedProduct[1] && (
          <div className="flex h-[calc((100vh-230px)/2)] flex-col items-start overflow-y-auto">
            <p className="text-sm font-bold text-red-600">상세 정보</p>
            <ProductTable
              productResponseDto={selectedProduct[1].productResponseDto}
            />
          </div>
        )}
      </div>
    </div>
  );
}
