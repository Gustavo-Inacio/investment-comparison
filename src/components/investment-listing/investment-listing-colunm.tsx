import { cn } from "@/lib/utils";
import { Children } from "react";

interface InvestmentListingColumnProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const InvestmentListingColumn = ({ ...props }: InvestmentListingColumnProps) => {
  return (
    <div className={cn('px-4 py-2 border-b border-gray-200 flex flex-1', props.className)}>
      {props.children}
    </div>
  )
}