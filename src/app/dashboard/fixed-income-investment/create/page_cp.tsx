'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateInvestmentsContributionConfiguration } from "@/components/create-investment/contribution-configurations";
import { createInvestmentsConfiguration, CreateInvestmentsConfiguration, ICreateInvestmentsConfigurationData } from "@/components/create-investment/investment-configurations";
import CustomTabs from "@/components/tabs";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { ContributionFrequencyEnum, IndexRateEnum, Investment, InvestmentTypeEnum, LiquidityEnum } from "@/model/investment/investiment.model";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// type IFormData = ICreateInvestmentsConfigurationData & ICreateInvestmentsContributionConfigurationData

const initialFormData: any = {
    name: '',
    dueDate: new Date(),
    indexRateType: '',
    indexRate: 0,
    yearRateAdd: '',
    type: '',
    initialContribution: '',
    contributionAmount: '',
    contributionFrequency: '',
    liquidity: '',
  }
  
const formSchema = {
  createInvestmentsContributionConfiguration: z.object({
    initialContribution: z.number().min(1, { error: "A contribuição inicial é obrigatória" }),
    contributionAmount: z.number().min(1, { error: "O valor da contribuição é obrigatório" }),
    contributionFrequency: z.string().min(1, { error: "A frequência da contribuição é obrigatória" }),
    liquidity: z.string().min(1, { error: "A liquidez é obrigatória" }),
  }),
  
}


export default function CreateFixedIncomeInvestmentPage() {
  
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: initialFormData,
  //   mode: 'onTouched',
  // });
  
  const configurationForm = useForm<z.infer<typeof createInvestmentsConfiguration>>({
    resolver: zodResolver(createInvestmentsConfiguration),
    defaultValues: {
      name: '',
      dueDate: new Date(),
      indexRateType: '',
      indexRate: 100,
      yearRateAdd: '',
      type: '',
    },
    mode: 'onTouched',
  });
  
  const contributionForm = useForm<z.infer<typeof formSchema.createInvestmentsContributionConfiguration>>({
    resolver: zodResolver(formSchema.createInvestmentsContributionConfiguration),
    defaultValues: initialFormData,
    mode: 'onTouched',
  });
  
  const handleMergeFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
          
    const configValid = await configurationForm.trigger();
    const contribValid = await contributionForm.trigger();
    
    if (!configValid || !contribValid) {
      return;
    }
    
    const finalData = {
      ...configurationForm.getValues(),
      ...contributionForm.getValues()
    }    
    
    console.log('final Data', finalData);

  }
  
  
  // const [storedValue, setStoredValue] = useLocalStorage<Investment[]>("Investment", [] as Investment[]);

  // const [formData, setFormData] = useState<IFormData>(initialFormData);
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | undefined) => {

  //   if (e == undefined) {
  //     return
  //   }
    
  //   if (e instanceof Date) {
  //     setFormData((prevData) => ({ ...prevData, investmentDueDate: e.toISOString() }));
  //     return;
  //   }
    
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // }

  // const handleSaveBtn = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
  //   event.preventDefault();
    
  //   console.log('form Data', formData);

  //   for (const [key, value] of Object.entries(formData)) {
  //     if (!value || value == undefined) {
  //       toast.error(`Por favor preencha o campo ${key}`, {
  //         duration: 4000,
  //       });
  //       return;
  //     }
  //   }
    
  //   const dataToStore: Investment = {
  //     name: formData.name,
  //     dueDate: new Date(formData.dueDate),
  //     id: new Date().getTime().toString(),
  //     rate: {
  //       type: formData.index ?? IndexRateEnum.CDI,
  //       indexRate: formData.indexRate,
  //       yearAddedRate: formData.yearRateAdd
  //     },
  //     type: InvestmentTypeEnum[formData.type as keyof typeof InvestmentTypeEnum],
  //     initialContribution: formData.initialContribution,
  //     contribution: {
  //       amount: formData.contributionAmount,
  //       frequency: ContributionFrequencyEnum[formData.contributionFrequency as keyof typeof ContributionFrequencyEnum]
  //     },
  //     liquidity: LiquidityEnum.NO_FINAL
  //   }

  //   setStoredValue((prev) => {
  //     return [...prev, dataToStore]
  //   });
  //   setFormData(initialFormData);
    
  //   toast.success("Investimento criado com sucesso!", {
  //     duration: 4000,
  //   })
  // }
  
  return (
    <div className="bg-gray-100 w-full md:p-2 max-w-[850px]">
      <div>
        <h1 className="text-3xl font-bold">Criar Investimento</h1>
      </div>
      <form action="" method="POST" onSubmit={handleMergeFormSubmit}>
        {/* <div className="lg:hidden">
          <CustomTabs data={formData} onChange={handleInputChange} />
        </div> */}

        <div className="hidden lg:flex flex-col">
          <CreateInvestmentsConfiguration form={configurationForm} />
          <CreateInvestmentsContributionConfiguration form={contributionForm} />
          <div className="flex flex-row">
            <Button type="submit" className="bg-sky-700 mt-2 ms-auto text-center text-base p-5 mr-2" >Criar Investimento </Button>
          </div>
        </div>
        
      </form>
    </div>
  );
}