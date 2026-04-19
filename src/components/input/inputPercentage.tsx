'use client'

import { toast } from "sonner";
import { Input } from "../ui/input"

export const InputPercentage = (props : React.ComponentProps<"input">) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const valueWithoutPercent = value.replace('%', '');
    if (isNaN(Number(valueWithoutPercent))) {
      toast.error('Por favor, insira um valor numérico válido.', {
        style: { backgroundColor: '#ffdddd', color: '#900' },
        position: 'bottom-right',
      });

    }
    let numericValue = value.replace(/[^0-9.]/g, '');
    const firstDotIndex = numericValue.indexOf('.');
    if (firstDotIndex !== -1) {
      numericValue =
        numericValue.slice(0, firstDotIndex + 1) +
        numericValue.slice(firstDotIndex + 1).replace(/\./g, '');
    }

    if (isNaN(Number(numericValue))) {
      event.target.value = '';
      return;
    }
    
    const backSpacePressed = event.nativeEvent['inputType'] == 'deleteContentBackward';
    if (backSpacePressed) {
      numericValue = numericValue.slice(0, -1);
    }

    event.target.value = numericValue + '%';
  }

  return (
    <Input {...props} placeholder="100%" type="text" />
  )
}
  