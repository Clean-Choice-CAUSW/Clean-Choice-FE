import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function IngredientsTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="icon-[material-symbols--info-outline] size-[16px]" />
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="text-sm">
            각 색상은 <span className="text-orange-400">개인 주의</span>,{" "}
            <span className="text-red-500">통관 금지</span>,{" "}
            <span className="text-[#32ADE6]">안전 성분</span>을 의미합니다.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
