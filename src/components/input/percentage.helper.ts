import { Value } from "@radix-ui/react-select";
import { ControllerRenderProps } from "react-hook-form";

const percentFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formater = (value: any) => {
  return percentFormatter.format(value / 100) + "%";
}

function parsePercent(value: string): number {
  const cleaned = value
    .replace("%", "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");
  // const cleaned = value.replace(/\D/g, "");

  return cleaned ? Number(cleaned) / 100 : 0;
}

export function withIntlPercentMask(
  field: ControllerRenderProps<any, any>
) {
  return {
    ...field,

    value:
      typeof field.value === "number"
        ? formater(field.value)
        : "0.00%",

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const decimal = parsePercent(input.value);

      field.onChange(decimal);

      requestAnimationFrame(() => {
        const pos = input.value.length - 1;
        input.setSelectionRange(pos, pos);
      });
    },

    onClick: (e: React.MouseEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const pos = input.value.length - 1;
      input.setSelectionRange(pos, pos);
    },
  };
}