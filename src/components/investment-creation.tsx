'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { CalendarPicker } from "./input/calendarPicker";
import { SelectTrigger, SelectValue, Select, SelectContent, SelectGroup, SelectItem } from "./ui/select";
import { ContributionFrequencyEnum, IndexRateEnum, InvestmentTypeEnum } from "@/model/investment/investiment.model";
import { Button } from "./ui/button";
import { formatBRLFromCents, parseBRLToCents } from "./input/currency.helper";
import { AdPlaceholder } from "./ad-placeholder";
import { useLocalStorage } from "@/hooks/use-localstorage";

export const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    dueDate: z.date().min(new Date(Date.now() + 24 * 60 * 60 * 1000), "Data de vencimento deve ser pelo menos um dia no futuro"),
    type: z.string().min(1, "Selecione o tipo do investimento"),

    indexValue: z.number().min(0, "Taxa de juros deve ser um valor positivo"),
    indexType: z.string().min(1, "Selecione o tipo de indexador"),
    indexAddedValue: z.number().min(0, "Valor da sobretaxa deve ser positivo"),

    initialContributionAmount: z.number().min(1, "O valor do aporte inicial deve ser pelo menos R$ 0,01"),
    frequentContributionAmount: z.number().min(0, "O valor do aporte frequente deve ser um valor positivo"),
    contributionFrequencyType: z.string().min(1, "Selecione a frequência do aporte"),
    liquidityDate: z.date().min(new Date(Date.now() + 24 * 60 * 60 * 1000), "Data de liquidação deve ser pelo menos um dia no futuro"),

});


export const InvestmentCreation = () => {
    const [storedInvestments, setStoredInvestments] = useLocalStorage("investments", [] as z.infer<typeof formSchema>[]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            dueDate: new Date(),
            type: "",

            indexValue: 100,
            indexType: "",
            indexAddedValue: 0,

            initialContributionAmount: 0,
            frequentContributionAmount: 0,
            contributionFrequencyType: "",
            liquidityDate: new Date(),
        },
        mode: "all",
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        
        setStoredInvestments((prevInvestments) => [...prevInvestments, values]);
        form.reset();
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md ">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-6.75 flex flex-col">

                    
                    <FormField
                        control={form.control}
                        name="name" 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs md:text-xs font-bold text-[#6D798B] tracking-widest">NOME DO TITULO</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex.: CDB BMG 120% CDI " {...field} className="bg-[#F2F4F5] rounded-sx border-none pt-5 pb-5 px-4 md:text-[16px]"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-4 w-full flex-wrap items-baseline">
                        <FormField
                            control={form.control}
                            name="dueDate" 
                            render={({ field }) => {
                                const label = (<>
                                    <FormLabel className="text-[12px] text-xs md:text-xs font-bold text-[#6D798B] tracking-widest whitespace-nowrap">DATA DE VENCIMENTO</FormLabel>
                                    <FormMessage className="text-sm"/>
                                </>)

                                return (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <CalendarPicker 
                                                className="bg-[#F2F4F5] rounded-sx border-none text-sm font-light text-[#001E40] mt-2 " 
                                                label={label}
                                                placeholderText="Selecione a data de vencimento"
                                                {...field}
                                            />

                                        </FormControl>
                                        
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField 
                            control={form.control}
                            name="type"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs md:text-xs font-bold text-[#6D798B] tracking-widest whitespace-nowrap">TIPO DE TITULO</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                                            <SelectTrigger className="bg-[#F2F4F5] rounded-sx border-none text-sm font-light text-[#001E40] mt-0 w-full">
                                                <SelectValue placeholder={Object.values(InvestmentTypeEnum)[0]} className="text-[#001E40]" />
                                            </SelectTrigger>
                                            <SelectContent className="p-0 m-0 text-[#001E40]">
                                                <SelectGroup >
                                                {Object.values(InvestmentTypeEnum).map((type) => (
                                                    <SelectItem key={type} value={type} className="text-[#001E40]">
                                                        {type}
                                                    </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>

                    <div className="flex gap-4.5 w-full flex-wrap lg:flex-nowrap items-baseline">
                        <FormField 
                            control={form.control}
                            name="indexValue"
                            render={({field}) => {
                                const { onChange, value, ...restField} = field;

                                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                    const percentValue = parseFloat(e.target.value);
                                    onChange(percentValue);
                                }

                                const displayValue = Number(value).toString() == "NaN" ? 0 : value.toString();
                                
                                return (
                                    <FormItem className="w-full lg:w-1/4">
                                        <FormLabel className="text-xs md:text-xs font-bold text-[#6D798B] tracking-widest whitespace-nowrap">VALOR DO JUROS</FormLabel>
                                        <FormControl>
                                            <div className="bg-[#F2F4F5] rounded-sx border-none flex items-center gap-1 text-sm font-light text-[#6B7280] w-full px-4 pr-0">
                                                <span>%</span>
                                                <Input onChange={(e) => handleChange(e)} value={displayValue} type="number" inputMode="numeric" placeholder="Ex.: 100" {...restField} className="text-[20px] font-bold text-[#6B7280] outline-0"/>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-sm"/>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField 
                            control={form.control}
                            name="indexAddedValue"
                            render={({field}) => {
                                const { onChange, value, ...restField} = field;

                                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                    const percentValue = parseFloat(e.target.value);
                                    onChange(percentValue);
                                }

                                const displayValue = Number(value).toString() == "NaN" ? 0 : value.toString();

                                return (
                                    <FormItem className="w-full lg:w-1/4">
                                        <FormLabel className="text-xs md:text-xs font-bold text-[#6D798B] tracking-widest whitespace-nowrap">VALOR DA SOBRETAXA</FormLabel>
                                        <FormControl>
                                            <div className="bg-[#F2F4F5] rounded-sx border-none flex items-center gap-1 text-sm font-light text-[#6B7280] w-full px-4 pr-0">
                                                <span>%</span>
                                                <Input onChange={(e) => handleChange(e)} value={displayValue} type="number" inputMode="numeric" placeholder="Ex.: 100" {...restField} className="text-[20px] font-bold text-[#6B7280] outline-0"/>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-sm"/>
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField 
                            control={form.control}
                            name="indexType"
                            render={({field}) => (
                                <FormItem className="w-full lg:w-2/4">
                                    <FormLabel className="text-xs md:text-xs font-bold text-[#6D798B] tracking-widest whitespace-nowrap">TAXA INDEXADORRA</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                                            <SelectTrigger className="bg-[#F2F4F5] rounded-sx border-none text-sm font-light text-[#001E40] mt-0 w-full">
                                                <SelectValue placeholder={Object.values(IndexRateEnum)[0]} className="text-[#001E40]" />
                                            </SelectTrigger>
                                            <SelectContent className="p-0 m-0 text-[#001E40]">
                                                <SelectGroup >
                                                {Object.values(IndexRateEnum).map((type) => (
                                                    <SelectItem key={type} value={type} className="text-[#001E40]">
                                                        {type}
                                                    </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-sm"/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-4.5 items-baseline">
                        <FormField 
                            control={form.control}
                            name="initialContributionAmount"
                            render={({field}) => {
                                
                                const { onChange, value, ...restField } = field;

                                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                    const cents = parseBRLToCents(e.target.value);
                                    onChange(cents ?? 0);
                                };
                                
                                const displayValue = formatBRLFromCents(value as number);
                                return (
                                    <FormItem className="w-2/4">
                                        <FormLabel className="text-xs md:text-xs font-bold text-[#6D798B] tracking-widest">APORTE INICIAL</FormLabel>
                                        <FormControl>
                                            <div className="bg-[#F2F4F5] rounded-sx border-none flex items-center gap-1 text-sm font-light text-[#6B7280] w-full px-4 pr-0">
                                                <span>R$</span>
                                                <Input value={displayValue} onChange={handleChange} type="text"  placeholder="1000,00" {...restField} className="text-[20px] font-bold text-[#6B7280] outline-0"/>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-sm"/>
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="liquidityDate" 
                            render={({ field, fieldState: { error} }) => (
                                <FormItem className="w-2/4">
                                    <FormControl>
                                        <CalendarPicker 
                                            className="bg-[#F2F4F5] rounded-sx border-none text-sm font-light text-[#001E40] mt-2 " 
                                            label={<FormLabel className="text-[12px] text-xs md:text-xs font-bold text-[#6D798B] tracking-widest">DATA INÍCIO DA LIQUIDEZ</FormLabel>}
                                            placeholderText="Selecione a data de vencimento"
                                            onSelectDate={(date) => field.onChange(date)}
                                            error={error?.message}

                                            {...field}
                                        />
                                    
                                    </FormControl>
                                    {error && <FormMessage className="text-destructive">{error.message}</FormMessage>}
                                </FormItem>
                            )}
                        />  
                    </div>

                    <div className="flex gap-4.5 items-baseline">
                        <FormField 
                            control={form.control}
                            name="frequentContributionAmount"
                            render={({field}) => {
                                const { onChange, value, ...restField } = field;

                                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                    const cents = parseBRLToCents(e.target.value);
                                    onChange(cents ?? 0);
                                };
                                
                                const displayValue = formatBRLFromCents(value as number);

                                return (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-xs md:text-xs font-bold text-[#6D798B] tracking-widest">APORTE RECORRENTE</FormLabel>
                                        <FormControl>
                                            <div className="bg-[#F2F4F5] rounded-sx border-none flex items-center gap-1 text-sm font-light text-[#6B7280] w-full px-4 pr-0">
                                                <span>R$</span>
                                                <Input value={displayValue} onChange={handleChange} type="text"  placeholder="1000,00" {...restField} className="text-[20px] font-bold text-[#6B7280] outline-0"/>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-sm"/>
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="contributionFrequencyType" 
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs md:text-xs font-bold text-[#6D798B] tracking-widest">TIPO DE RECORRÊNCIA</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                                            <SelectTrigger className="bg-[#F2F4F5] rounded-sx border-none text-sm font-light text-[#001E40] mt-0 w-full">
                                                <SelectValue placeholder={Object.values(ContributionFrequencyEnum)[0]} className="text-[#001E40]" />
                                            </SelectTrigger>
                                            <SelectContent className="p-0 m-0 text-[#001E40]">
                                                <SelectGroup >
                                                {Object.values(ContributionFrequencyEnum).map((type) => (
                                                    <SelectItem key={type} value={type} className="text-[#001E40]">
                                                        {type}
                                                    </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-sm"/>
                                </FormItem>
                            )}
                        />  
                    </div>

                    <Button type="submit" className="bg-linear-to-r from-[#004676] to-[#0070BD] cursor-pointer rounded-8">ADICIONAR À CARTEIRA</Button>
                </form>
            </Form>
            <AdPlaceholder width="100%" height="250px" />
        </div>
    );
}