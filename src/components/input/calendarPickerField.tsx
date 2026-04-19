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
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form"

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

type TFieldValues = FieldValues;
type TName = FieldPath<TFieldValues>;
type TField = ControllerRenderProps<TFieldValues, TName>

interface CalendarPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  labelText?: string,
  placeholderText?: string,
  label?: React.ReactNode,
  name?: string,
  field: TField,
  id?: string,
}

export function CalendarPickerField({ labelText, placeholderText, label, name, field, id }: CalendarPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(field.value ? formatDate(field.value) : "")
  const [date, setDate] = React.useState<Date | undefined>(
    parseDate(value) || undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  
  return (
    <div className="flex flex-col gap-3">
      {label && label }
      <div className="relative flex gap-2">
        <Input
          id={id}
          value={value}
          readOnly={true}
          placeholder={placeholderText}
          className="bg-background pr-10 bg-red"
          name={name}
          onChange={(e) => {
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
              endMonth={new Date("2100-12-31")}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              selected={field.value}
              disabled={false}
              numberOfMonths={1}
              onSelect={(date) => {
                setDate(date)
                setValue(formatDate(date))
                setOpen(false)
                field.onChange(date)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
