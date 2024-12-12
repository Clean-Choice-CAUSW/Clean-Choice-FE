import type { ProductIngredientJoinResponseDto } from "@/@types/product";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function ClearanceTooltip({
  clearanceBannedList,
}: {
  clearanceBannedList: ProductIngredientJoinResponseDto[];
}) {
  const clear = clearanceBannedList.length === 0;

  return (
    <TooltipProvider delayDuration={10}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`icon-[icon-park-twotone--check-one] size-[24px] ${clear ? "text-green-500" : "text-red-500"}`}
          />
        </TooltipTrigger>
        <TooltipContent side="left">
          <p className="text-sm">
            {clear ? (
              "통관이 가능한 품목입니다"
            ) : (
              <>
                <span className="text-red-500">
                  통관 금지 성분{" "}
                  {clearanceBannedList.map(
                    (i) => i.ingredientResponseDto.englishName,
                  )}
                </span>
                이 포함되어 있습니다.
              </>
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
