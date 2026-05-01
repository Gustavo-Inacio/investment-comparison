import { formatBRLFromCents } from "../input/currency.helper";

interface InvestmentSummaryCardProps {
    title: string;
    valueCents: number;
    description?: string;
    icon?: React.ReactNode;
}

export const InvestmentSummaryCard = ({ title, valueCents, description, icon }: InvestmentSummaryCardProps) => {
    return (
        <div className="flex flex-col justify-start p-6 gap-3 relative w-full bg-white rounded-2xl">
            {icon && 
                <div className="absolute right-6">
                    {icon}
                </div>
            }
            <h2 className="text-md text-[#43474F] text-start">{title}</h2>
            <p className="text-3xl font-bold text-[#001E40] text-start">R$ {formatBRLFromCents(valueCents)}</p>
            {description && <p className="text-sm text-start">{description}</p>}
        </div>
    );
}