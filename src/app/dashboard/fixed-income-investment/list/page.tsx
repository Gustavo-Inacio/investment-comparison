"use client";

import { InvestmentListingBlock } from "@/components/investment-listing/investment-listing-block";
import { InvestmentListingRow } from "@/components/investment-listing/investment-listing-row";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { Investment } from "@/model/investment/investiment.model";
import { use } from "react";

export default function ListFixedIncomeInvestmentPage() {
  const listingColumns = ["Nome", "Vencimento", "Taxa", "Aporte Inicial", "% IR", "R$ IR", "Rend. Brut. Final", "Rend. Líq. Final"];

  const [localDataStorage, setLocalDataStorage] = useLocalStorage<Investment[]>("Investment", [] as Investment[]);

  console.log('q',localDataStorage)
  
  return (
    <div>
      <header className="px-7 py-2 pt-5">
        <h1 className="text-4xl font-bold">Meus Investimentos</h1>
      </header>
      <div className="space-y-4 bg-stone-50 p-6 rounded-lg shadow-md">
        <InvestmentListingRow data={listingColumns} />

        {localDataStorage.map(investment => {
          return ( 
            <InvestmentListingBlock key={investment.id} blockTitle="CDB">
              <InvestmentListingRow data={[investment.name, investment.dueDate.toString(), `${investment.rate.indexRate} do (a) ${investment.rate.type}`, "R$ 1.000", "15%", "R$ 150", "R$ 1.080", "R$ 930"]} />
            </InvestmentListingBlock>
            )
            
          
        })}
       

      </div>
    </div>
  );
}