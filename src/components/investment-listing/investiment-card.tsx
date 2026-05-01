import { Pencil } from "lucide-react";

interface InvestmentCardProps {
    title: string;
    type: string;
    appliedValueCents: number;
    indexRate: string;
}

export const InvestmentCard = (props: InvestmentCardProps) => {
    return (
        <div className="flex flex-col justify-start p-6 w-full relative bg-white rounded-2xl">
            <div className="relative flex w-full flex-col">
                <Pencil className="absolute right-0" />
                <h2 className="investment-name font-black text-xl ">{props.title}</h2>
                <p className="investiment-type m-0">{props.type}</p>

            </div>
            <hr className="my-5"/>
            <div className="flex justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">Valor Aplicado</p>
                    <p className="investment-applied-value font-bold">R$ {props.appliedValueCents.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Taxa</p>
                    <p className="investment-index-rate font-bold">{props.indexRate}</p>
                </div>

            </div>
            
        </div>
    );
}