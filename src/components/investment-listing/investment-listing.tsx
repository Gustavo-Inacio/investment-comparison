'use client';

import { useEffect, useState } from "react";
import { Coins, Pencil, Search } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, DotButton, DotButtonIndex, useDotButton } from "../ui/carousel";
import { InvestmentSummaryCard } from "./investment-sumarry-card";
import { AdPlaceholder } from "../ad-placeholder";
import { Input } from "../ui/input";
import { InvestmentCard } from "./investiment-card";
import { LOCAL_STORAGE_KEY, useLocalStorage } from "@/hooks/use-localstorage";
import { Investment } from "@/model/investment/investiment.model";
import { InvestmentSummary } from "./investment-summary";
import { formatBRLFromCents } from "../input/currency.helper";



export const InvestmentListing = () => {
    const [storedInvestments] = useLocalStorage(LOCAL_STORAGE_KEY, [] as Investment[]);
    const [isMounted, setIsMounted] = useState(false);

    console.log("Stored Investments:", storedInvestments);

    // Hydration guard: ensures the component only renders data-dependent UI 
    // after the initial client-side mount.
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="w-full md:w-50 animate-pulse bg-gray-50 min-h-[400px]" />;
    }

    return (
        <div className="w-full ">
            <InvestmentSummary investments={storedInvestments} />
            <AdPlaceholder width="100%" height="200px" />
            
            <section className="flex w-full flex-col gap-4 mt-4">
                <div className="flex w-full">
                    <div className="flex items-center gap-2 w-full">
                       
                        <Search size={14} className="absolute translate-x-2 pointer-events-none" color="#353535"/>
                        <Input placeholder="Buscar investimentos..." className="pl-8 md:pl-8 text-[14px] border-none outline-none w-full" />
                        
                    </div>

                </div>

                <div className="investiments-area flex w-full gap-4 ">
                    <header className="w-full flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#001E40]">Investimentos</h2>
                        <span className="text-sm text-[#43474F]">{storedInvestments.length} investimentos</span>
                    </header>
                </div>

                <div className="flex flex-wrap gap-5 lg:hidden">
                    {
                        storedInvestments.map((investment, index) => (
                            <InvestmentCard 
                                investment={investment}
                                key={index}
                            />
                        ))
                    }
                </div>


                <div className="space-y-4 mt-8 pb-10 lg:block hidden">
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-[#6D798B]">
                        <div className="col-span-4">Ativo / Emissor</div>
                        <div className="col-span-2 text-right">Taxa</div>
                        <div className="col-span-2 text-right">Valor Aplicado</div>
                        <div className="col-span-2 text-right">Vencimento</div>
                        <div className="col-span-2 text-right">Ações</div>
                    </div>

                    {storedInvestments.map((investment, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-xl p-6 md:p-0 md:px-6 md:py-5 shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer border border-transparent hover:border-blue-100"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                {/* Asset / Issuer */}
                                <div className="col-span-1 md:col-span-4 flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Coins size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#001E40] text-base">{investment.name}</h4>
                                        <p className="text-xs text-[#43474F] mt-0.5">{investment.type}</p>
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2 flex justify-between md:block md:text-right">
                                    <span className="md:hidden text-xs font-bold text-[#6D798B] uppercase">Taxa</span>
                                    <span className="font-semibold text-[#001E40]">{investment.rate.indexRate}% {investment.rate.type}</span>
                                </div>

                                <div className="col-span-1 md:col-span-2 flex justify-between md:block md:text-right">
                                    <span className="md:hidden text-xs font-bold text-[#6D798B] uppercase">Valor</span>
                                    <span className="font-medium text-[#001E40]">R$ {formatBRLFromCents(investment.initialContribution || 0)}</span>
                                </div>

                                <div className="col-span-1 md:col-span-2 flex justify-between md:block md:text-right">
                                    <span className="md:hidden text-xs font-bold text-[#6D798B] uppercase">Vencimento</span>
                                    <span className="text-[#43474F] text-sm">{new Date(investment.dueDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}</span>
                                </div>

                                <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center mt-2 md:mt-0">
                                    <span className="md:hidden text-xs font-bold text-[#6D798B] uppercase">Ações</span>
                                    <button className="p-2 rounded-full hover:bg-gray-100 text-[#001E40] transition-colors" title="Editar investimento">
                                        <Pencil size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
