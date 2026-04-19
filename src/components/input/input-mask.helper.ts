import { ControllerRenderProps } from "react-hook-form";

export function withMask<TValue>(
  field: ControllerRenderProps<any, any>,
  format: (value: TValue | null) => string,
  parse: (value: string) => TValue | null
) {
  return {
    ...field,
    value: format(field.value as TValue | null),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('e.target.value', e, parse(e.target.value));
      field.onChange(parse(e.target.value));
    },
  };
}
