"use client";

import { AdPlaceholder } from "@/components/ad-placeholder";
import { InvestmentListing } from "@/components/investment-listing/investment-listing";
import { InvestmentListingBlock } from "@/components/investment-listing/investment-listing-block";
import { InvestmentListingRow } from "@/components/investment-listing/investment-listing-row";
import { PageHeader } from "@/components/page-header/page-header";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { Investment } from "@/model/investment/investiment.model";
import { use } from "react";

export default function ListFixedIncomeInvestmentPage() {
  const [localDataStorage, setLocalDataStorage] = useLocalStorage<Investment[]>("Investment", [] as Investment[]);
  
  return (
    
        <div className="p-5 md:p-10 bg-[#F8FAFB]">
          <PageHeader
            title="Meus Investimentos"
            text="Gerencie os investimentos de renda fixa que você criou, visualize detalhes, edite ou exclua conforme necessário para manter sua carteira atualizada."
          />
    
          <div className="w-full lg:w-2/3">
            <InvestmentListing />
                {/* <AdPlaceholder width="100%" height="200px" /> */}
          </div>
    
        </div>
  );
}