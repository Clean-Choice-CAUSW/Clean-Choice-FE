import type { BanedIngredientInfoResponseDto } from "@/@types/product";
import { TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipTrigger } from "./ui/tooltip";

export default function IngredientTag({
  name,
  description,
  isClearanceBaned,
  bannedIngredientInfo,
}: {
  name: string;
  description: string;
  isClearanceBaned: boolean;
  bannedIngredientInfo: BanedIngredientInfoResponseDto[];
}) {
  let color = isClearanceBaned ? "bg-red-500" : "bg-[#32ADE6]";

  let desc = description;
  if (bannedIngredientInfo.length > 0 && !isClearanceBaned) {
    color = "bg-orange-400";
    desc =
      desc + "\n" + bannedIngredientInfo.map((i) => i.description).join("\n");
  }
  console.log(desc);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button className={`rounded-full ${color} p-[5px] text-white`}>
            {name.length >= 10 ? `${name.slice(0, 9)}...` : name}
          </button>
        </TooltipTrigger>
        <TooltipContent className="z-50 max-h-[300px] whitespace-pre-wrap">
          <p className="whitespace-pre-wrap rounded-md border border-gray-300 bg-white p-2 text-start text-sm shadow-md">
            {desc}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
