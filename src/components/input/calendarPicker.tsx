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

function formatDate(dateTime: Date | undefined) {
  if (!dateTime) {
    return ""
  }

  const date = dateTime.toISOString().split("T")[0];

  return date.replaceAll("-", "/").split("/").reverse().join("/") // Convert to DD/MM/YYYY
}

function formatDateMask(value: string): string {
  const cleaned = value.replace(/\D/g, "")
  if (cleaned.length <= 2) {
    return cleaned
  }
  if (cleaned.length <= 4) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
  }
  return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`
}

interface CalendarPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  labelText?: string,
  placeholderText?: string,
  label?: React.ReactNode,
  name?: string,
  onSelectDate?: (date: Date | undefined) => void,
  inputProps?: any,
  validate?: (date: Date | undefined) => string | undefined,
  error?: string,
}

export function CalendarPicker({ labelText, placeholderText, label, name, onSelectDate, className, inputProps, validate, error }: CalendarPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [date, setDate] = React.useState<Date | undefined>(
    parseDate(value) || undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [validationError, setValidationError] = React.useState<string | undefined>(error)
  
  return (
    <div className={`flex flex-col gap-3"`} >
      {label ? label : <label htmlFor="date">
        {labelText || ""}
      </label>}
      <div className={`${className} relative flex gap-2`}>
        <Input
          id="date"
          value={value}
          placeholder={placeholderText || "MM/DD/YYYY"}
          className="bg-background pr-10 bg-red"
          name={name}
          type="text"
          inputMode="numeric"
          maxLength={10}
          onChange={(e) => {
            const masked = formatDateMask(e.target.value)
            setValue(masked)
            const date = parseDate(masked)
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
          {...inputProps}
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
              fromYear={1980}
              toYear={2200}
              onSelect={(selectedDate) => {
                setDate(selectedDate)
                setValue(formatDate(selectedDate))
                setOpen(false)
                
                // Run validation if provided
                if (validate) {
                  const validationResult = validate(selectedDate)
                  setValidationError(validationResult)
                }
                
                if (onSelectDate) {
                  onSelectDate(selectedDate);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {validationError && <span className="text-sm text-red-500">{validationError}</span>}
    </div>
  )
}


