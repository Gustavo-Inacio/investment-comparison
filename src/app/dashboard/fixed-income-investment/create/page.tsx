import { InvestmentCreation } from "@/components/investment-creation";
import { PageHeader } from "@/components/page-header/page-header";

export default function CreateFixedIncomeInvestmentPage() {

  return (

    <div className="p-5 md:p-10">
      <PageHeader
        title="Criar Investimento"
        text="Configure os parâmetros do seu novo ativo de renda fixa para visualizar projeções de rentabilidade e impacto na carteira."
      />

      <div className="w-full lg:w-2/3">
        <InvestmentCreation />

      </div>

    </div>
  )
}