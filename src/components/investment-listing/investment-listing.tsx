import { Coins, Search } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, DotButton, DotButtonIndex, useDotButton } from "../ui/carousel";
import { InvestmentSummary } from "./investment-sumarry";
import { AdPlaceholder } from "../ad-placeholder";
import { Input } from "../ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { InvestmentCard } from "./investiment-card";



export const InvestmentListing = () => {
    return (
        <div className="w-full md:w-50 ">
            <Carousel opts={{
                align: 'start',
                containScroll: 'trimSnaps',
                

            }}>
                <CarouselContent className="gap-2 px-2">
                    <CarouselItem className="p-0 flex flex-col">
                        <div className="bg-white d-flex h-fit shadow-md rounded-lg p-0">
                            <InvestmentSummary 
                                title="Total aplicado" 
                                valueCents={1000} 
                                description="Total amount applied to investments" 
                                icon={<Coins color="#ccc" size={50} />}
                            />
                        </div>
                        <div className="h-3"></div>
                    </CarouselItem>
                    <CarouselItem className="bg-white d-flex h-fit shadow-md rounded-lg p-0">
                        <InvestmentSummary 
                            title="Total aplicado" 
                            valueCents={1000} 
                            description="Total amount applied to investments" 
                            icon={<Coins color="#ccc" size={50} />}
                        />
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

            
            <AdPlaceholder width="100%" height="200px" />
            
            <section className="flex w-full flex-col gap-4 mt-4">
                <div className="flex w-full">
                    <div className="flex items-center gap-2 w-full">
                       
                        <Search size={14} className="absolute translate-x-2 pointer-events-none" color="#353535"/>
                        <Input placeholder="Buscar investimentos..." className="pl-8 text-[14px] border-none outline-none w-full" />
                        
                    </div>

                </div>

                <div className="investiments-area flex w-full gap-4 ">
                    <header className="w-full flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#001E40]">Investimentos</h2>
                        <span className="text-sm text-[#43474F]">3 investimentos</span>
                    </header>
                </div>

                <div className="flex flex-wrap gap-5">
                    <InvestmentCard 
                        title="CDB BANCO BMG"
                        type="CDB"
                        appliedValueCents={1000}
                        indexRate="100 % CDI"
                    />
                     <InvestmentCard 
                        title="CDB BANCO BMG"
                        type="CDB"
                        appliedValueCents={1000}
                        indexRate="100 % CDI"
                    />
                     <InvestmentCard 
                        title="CDB BANCO BMG"
                        type="CDB"
                        appliedValueCents={1000}
                        indexRate="100 % CDI"
                    />
                </div>


            </section>

            {/* <Table>
                <TableCaption>Lista de investimentos</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nome do Investimento</TableHead>
                        <TableHead>Taxa</TableHead>
                        <TableHead>Valor aplicado</TableHead>
                        <TableHead className="text-right">Vencimento</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>     */}
            

        </div>
    );
}
