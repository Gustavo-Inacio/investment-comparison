import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface InvestmentRateSelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  options: string[],
  label?: string,
  name?: string,
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  value?: string,
}

export function InvestmentRateSelect({ label, options, className, name, onChange, value }: InvestmentRateSelectProps) {
  const convertStringToEvent = (value: string): React.ChangeEvent<HTMLSelectElement> => {
    return {
      target: {
        name: name || '',
        value: value,
      },
    } as React.ChangeEvent<HTMLSelectElement>;
  }
  
  return (
    <Select onValueChange={(e) => { onChange?.(convertStringToEvent(e)) }} value={value}>
      <SelectTrigger className={cn('w-full', className)} name={name}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
