"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateInvestmentsConfiguration, ICreateInvestmentsConfigurationData } from "./create-investment/investment-configurations"
import { Button } from "./ui/button"
import { ArrowBigLeft, ArrowBigRight, MoveLeft, MoveRight } from "lucide-react"
import { useRef } from "react"
import { CreateInvestmentsContributionConfiguration, ICreateInvestmentsContributionConfigurationData } from "./create-investment/contribution-configurations"

type IFormData = ICreateInvestmentsConfigurationData & ICreateInvestmentsContributionConfigurationData

interface CustomTabsProps {
  data: IFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | undefined) => void;
}

export default function CustomTabs({
  data,
  onChange
}: CustomTabsProps) {
  const contributionConfigRef = useRef<HTMLButtonElement>(null);
  const investmentConfigRef = useRef<HTMLButtonElement>(null);
  
  const handleNextButton = () => {
    contributionConfigRef.current?.focus()
  }
  
  const handleBackButton = () => {
    investmentConfigRef.current?.focus()
  }
  
  return (
    <Tabs defaultValue="investiment-config" className="g-[0px]" dir="ltr">
      <TabsList className="h-20 p-0 w-full ">
        <TabsTrigger className='flex justify-start' value="investiment-config" ref={investmentConfigRef}>
          <span className="text-wrap leading-6 w-[90%] max-w-50">
            Configuração do Investimento
          </span>
        </TabsTrigger>
        <TabsTrigger className='flex justify-start' value="contribution-config" ref={contributionConfigRef}>
          <span className="text-wrap leading-6 w-[90%] max-w-50 ">
            Configuração dos Aportes
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="investiment-config" className="flex flex-col">
        <CreateInvestmentsConfiguration data={data} onChange={onChange} />
        <Button className="bg-sky-700 mt-2 ms-auto text-center text-base p-5 mr-2" onClick={handleNextButton}>Prosseguir <MoveRight /></Button>
      </TabsContent>
      <TabsContent value="contribution-config">
        <CreateInvestmentsContributionConfiguration data={data} onChange={onChange} />
        <div className="flex flex-row">
          <Button variant="outline" className="border-stone-950 me-auto bg-transparent mt-2 text-center text-stone-950 p-5 mr-2" onClick={handleBackButton}><MoveLeft /> Voltar </Button>
          <Button className="bg-sky-700 mt-2 ms-auto text-center text-base p-5 mr-2" onClick={handleNextButton}>Criar Investimento </Button>
          
        </div>

      </TabsContent>
    </Tabs>
  )
}