import { Value } from "@radix-ui/react-select";
import { ControllerRenderProps } from "react-hook-form";

export function formatPercent(value: number | null): string {
  if (value == null) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    // unit: "",/
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    // maximumFractionDigits: 3,
    // currency: "BRL",
  }).format(value / 100);
  // return `${value.toFixed(2)}%`;
}

export function parsePercent(value: string): number | null {
  const normalized = value
    .replace("%", "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");

  const number = Number(normalized);
  return isNaN(number) ? null : number;
}

function parsePercentInput(value: string): number | null {
  // const cleaned = value.replace(/\D/g, "");
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : null;
  // if (!cleaned) return null;

  // const number = Number(cleaned);
  // if (isNaN(number)) return null;

  // return digits / 100;
}

function a (value: number | null): string {
    if (value == null) return "";
 
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  // minimumFractionDigits: 2,
  // maximumFractionDigits: 2,
});

export function withIntlPercentMask(
  field: ControllerRenderProps<any, any>
) {
  return {
    ...field,
    value: a(field.value),
    
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedValue = parsePercentInput(e.target.value);
      console.log('parsedValue', parsedValue);
      field.onChange(parsedValue);
    }
    
  };
}


// export function formatBRLFromCents(value: number | null): string {
//   if (value == null) return "";
//   return new Intl.NumberFormat("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   }).format(value / 100);
// }

// export function parseBRLToCents(value: string): number | null {
//   const digits = value.replace(/\D/g, "");
//   return digits ? Number(digits) : null;
// }
