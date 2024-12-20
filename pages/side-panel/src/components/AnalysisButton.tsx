import detectMarket from "@/lib/detectMarket";
import { analyzeProduct } from "@/services/product";
import { useAnalyzedProductStore } from "@/store/analyzedProductStore";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button } from "./ui/button";

export const AnalysisButton = () => {
  const authHeader = useAuthHeader();
  const [analyzing, setAnalyzing] = useState(false);
  const { setAnalyzedProduct } = useAnalyzedProductStore();

  if (!authHeader) return null;

  return (
    <Button
      className={`w-[70px] ${analyzing && "animate-pulse"}`}
      onClick={async () => {
        // get current main page's url
        const [tab] = await chrome.tabs.query({
          active: true,
          lastFocusedWindow: true,
        });
        if (tab && tab.url) {
          setAnalyzing(true);
          if (detectMarket(tab.url) === "ETC") {
            alert("대상 직구 사이트가 아닙니다.");
          }
          const result = await analyzeProduct(
            tab.url,
            detectMarket(tab.url),
            authHeader,
          );
          if (result) {
            setAnalyzedProduct(result);
          }
          setAnalyzing(false);
        }
      }}
    >
      {analyzing ? "분석 중" : "분석하기"}
    </Button>
  );
};
