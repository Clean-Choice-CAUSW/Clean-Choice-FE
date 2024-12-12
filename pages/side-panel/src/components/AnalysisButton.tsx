import { analyzeProduct } from "@/services/product";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button } from "./ui/button";

export const AnalysisButton = () => {
  const authHeader = useAuthHeader();

  if (!authHeader) return null;

  return (
    <Button
      className="w-[70px]"
      onClick={async () => {
        // get current main page's url
        const [tab] = await chrome.tabs.query({
          active: true,
          lastFocusedWindow: true,
        });
        if (tab && tab.url) {
          alert(tab.url);
          const result = await analyzeProduct(tab.url, "AMAZON", authHeader);
          console.log(JSON.stringify(result));
        }
      }}
    >
      분석하기
    </Button>
  );
};
