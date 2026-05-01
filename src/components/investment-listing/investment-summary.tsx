import { Investment } from "@/model/investment/investiment.model";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, DotButtonIndex } from "../ui/carousel";
import { Coins } from "lucide-react";
import { InvestmentSummaryCard } from "./investment-sumarry-card";

interface InvestmentSummaryProps {
    investments: Investment[];
}

export const InvestmentSummary = (props: InvestmentSummaryProps) => {

    const totalAppliedCents = props.investments.reduce((total, investment) => {
        return total + (investment.initialContribution || 0);
    }, 0);

    const totalReturnsCents = props.investments.reduce((total, investment) => {
        // Placeholder logic: typically requires calculation based on rate.
        return total + (investment.initialContribution || 0);
    }, 0);

    const totalAmountSummaryCard = (
        <InvestmentSummaryCard
            title="Total aplicado" 
            valueCents={totalAppliedCents} 
            description="Total amount applied to investments" 
            icon={<Coins color="#ccc" size={50} />}
        />
    );

    const totalReturnsSummaryCard = (
        <InvestmentSummaryCard 
            title="Retorno Bruto Total" 
            valueCents={totalReturnsCents} 
            description="Retorno comleto dos investimentos" 
            icon={<Coins color="#ccc" size={50} />}
        />
    );


    return (
        <>
            <div className="lg:hidden">
                <Carousel opts={{
                    align: 'start',
                    containScroll: 'trimSnaps',
                }}>
                    <CarouselContent className="gap-2 px-2">
                        <CarouselItem className="p-0 flex flex-col">
                            <div className="bg-white flex h-fit shadow-md rounded-lg p-0">
                                {totalAmountSummaryCard}
                            </div>
                            <div className="h-3"></div>
                        </CarouselItem>
                        <CarouselItem className="bg-white flex h-fit shadow-md rounded-lg p-0">
                            {totalReturnsSummaryCard}
                        </CarouselItem>
                        
                    </CarouselContent>
                    <div className="flex items-center justify-between mt-2">
                        <DotButtonIndex />
                        <div className="flex gap-2">
                            <CarouselPrevious className="relative"/> 
                            <CarouselNext className="relative"/>
                        </div>
                    </div>
                </Carousel>
            </div>

            <div className="hidden lg:flex gap-2 lg:flex-row w-full">
                {totalAmountSummaryCard}
                {totalReturnsSummaryCard}
                {totalReturnsSummaryCard}
            </div>
        </>
    );
}