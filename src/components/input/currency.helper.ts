export function formatBRLFromCents(value: number | null): string {
  if (value == null || value === 0) return "";
 
  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
  
  return formatted;
}

export function parseBRLToCents(value: string): number | null {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}
