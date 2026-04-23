interface InvestmentCardProps {
    title: string;
    value: number;
    description?: string;
    icon?: React.ReactNode;
}

export const InvestmentCard = ({ title, value, description, icon }: InvestmentCardProps) => {
    return (
        <div className="flex flex-col justify-center p-[24px]">
            {icon && <div>{icon}</div>}
            <h2 className="text-md text-[#43474F] text-center">{title}</h2>
            <p className="text-3xl font-bold text-[#001E40] text-center">${value.toFixed(2)}</p>
            {description && <p className="text-sm text-muted-foreground text-center">{description}</p>}
        </div>
    );
}