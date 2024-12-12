import type { ProductMarketResponseDto } from "@/@types/product";
import CustomSelectBasket from "@/components/basket/CustomSelectBasket";
import CustomForm from "@/components/custom/CustomForm";
import { useState } from "react";

export default function CustomPage() {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductMarketResponseDto | null>(null);

  return (
    <div className="flex h-screen w-full flex-col justify-start">
      <div className="h-[220px] border-b border-gray-300">
        <CustomSelectBasket
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </div>

      <CustomForm selectedProduct={selectedProduct} />
    </div>
  );
}
