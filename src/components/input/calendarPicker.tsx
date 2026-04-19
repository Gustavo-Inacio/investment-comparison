"use client"

import * as React from "react"
import { parseDate } from "chrono-node"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

interface CalendarPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  labelText?: string,
  placeholderText?: string,
  label?: React.ReactNode,
  name?: string,
  onSelectDate?: (date: Date | undefined) => void,
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
}

export function CalendarPicker({ labelText, placeholderText, label, name, onSelectDate, className, inputProps }: CalendarPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [date, setDate] = React.useState<Date | undefined>(
    parseDate(value) || undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  
  return (
    <div className={`flex flex-col gap-3"`} >
      {label ? label : <label htmlFor="date">
        {labelText || ""}
      </label>}
      <div className={`${className} relative flex gap-2`}>
        <Input
          id="date"
          value={value}
          readOnly={true}
          placeholder={placeholderText}
          className="bg-background pr-10 bg-red"
          name={name}
          // {...inputProps}
          onChange={(e) => {
            console.log('e', e)
            setValue(e.target.value)
            const date = parseDate(e.target.value)
            if (date) {
              setDate(date)
              setMonth(date)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Selecione uma data</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date)
                setValue(formatDate(date))
                setOpen(false)
                if (onSelectDate) {
                  onSelectDate(date);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
// import { format } from "date-fns"

// export function DatePickerDemo() {
//   const [date, setDate] = React.useState<Date>()

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           data-empty={!date}
//           className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
//         >
//           <CalendarIcon />
//           {date ? format(date, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar mode="single" selected={date} onSelect={setDate} />
//       </PopoverContent>
//     </Popover>
//   )
// }

