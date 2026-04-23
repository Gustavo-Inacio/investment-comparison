import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, DotButton, DotButtonIndex, useDotButton } from "../ui/carousel";
import { InvestmentCard } from "./investment-card";



export const InvestmentListing = () => {
    return (
        <div className="w-[200px] h-[300px] border-red-500 border-2">
            <Carousel className="w-[200px] " opts={{
                align: 'start',
                containScroll: 'trimSnaps',

            }}>
                <CarouselContent className="h-[300px]">
                    <CarouselItem>
                        <InvestmentCard title="TOTAL APPLIED" value={1000} description="Total amount applied to investments" />
                    </CarouselItem>
                    <CarouselItem>
                        <InvestmentCard title="TOTAL RETURNED" value={1500} description="Total amount returned from investments" />
                    </CarouselItem>
                    <CarouselItem>
                        <InvestmentCard title="TOTAL PROFIT" value={500} description="Total profit from investments" />
                    </CarouselItem>
                    <CarouselItem>
                        <InvestmentCard title="TOTAL LOSSES" value={200} description="Total losses from investments" />
                    </CarouselItem>
                </CarouselContent>
                <div className="flex items-center justify-between">
                    <DotButtonIndex />
                    <div className="flex gap-2">
                        <CarouselPrevious className="relative"/> 
                        <CarouselNext className="relative"/>
                    </div>
                </div>
            </Carousel>

        </div>
    );
}
