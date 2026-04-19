import { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues, UseFormStateReturn } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { ICreateInvestmentsConfigurationData } from "../create-investment/investment-configurations";
import { CalendarPicker } from "./calendarPicker";
import { Calendar } from "../ui/calendar";
import { CalendarPickerField } from "./calendarPickerField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { file } from "zod";

type TFieldValues = FieldValues;
type TName = FieldPath<TFieldValues>;
type TField = ControllerRenderProps<TFieldValues, TName>

interface InputFieldProps {
  field: TField;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;  
  content: {
    label: string;
    description: string;
    placeholder: string;
  }
}

export const InputField = ({ field, fieldState, content }: InputFieldProps) => {
  console.log('field', field);
  const htmlIdForm = `${content.label.toLowerCase().replace(/\s+/g, '-')}`; 
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={htmlIdForm}>
        {content.label}
      </FieldLabel>
      <Input
        {...field}
        id={htmlIdForm}
        aria-invalid={fieldState.invalid}
        placeholder={content.placeholder}
        autoComplete="name"
      />
      <FieldDescription>
        {content.description}
      </FieldDescription>
      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
      )}
    </Field>
  )
}

interface SelectInputFieldProps {
  field: TField;
  fieldState: ControllerFieldState;
  content: {
    label: string;
    description: string;
    options: string[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    className?: string;
  }
}

export const SelectInputField = ({ field, fieldState, content }: SelectInputFieldProps) => {
  const convertStringToEvent = (value: string): React.ChangeEvent<HTMLInputElement> => {
    return {
      target: {
        name: content.label || '',
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>;
  }
  const htmlIdForm = `${content.label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={htmlIdForm}>
        {content.label}
      </FieldLabel>
      <Select onValueChange={(e) => {field.onChange(convertStringToEvent(e)); console.log("oi")}} {...field}>
        <SelectTrigger className={cn('w-full', content.className)} name={content.label} id={htmlIdForm}>
          <SelectValue placeholder={content.label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{content.label}</SelectLabel>
            {content.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>
        {content.description}
      </FieldDescription>
      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
      )}
    </Field>
  )
}

export const CalendarInputField = ({ field, fieldState, content }: InputFieldProps) => {
  const htmlIdForm = `${content.label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={htmlIdForm}>
        {content.label}
      </FieldLabel>
      <CalendarPickerField 
        field={field}
        id={htmlIdForm}
        
      />
      <FieldDescription>
        {content.description}
      </FieldDescription>
      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
      )}
    </Field>
  )
}