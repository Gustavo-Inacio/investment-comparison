'use client'

import { InvestmentListingCellText } from "./investment-listing-cell-text"
import { InvestmentListingColumn } from "./investment-listing-colunm"

interface InvestmentListingRowProps {
  data: string[] | number[];
}

export const InvestmentListingRow = ({ data }: InvestmentListingRowProps) => {
  return (
    <div className="flex direction-row align-between bg-gray-300 rounded-[8px]">
      {data.map((item, index) => (
        <InvestmentListingColumn key={index} className="flex justify-center">
          <InvestmentListingCellText>{item}</InvestmentListingCellText>
        </InvestmentListingColumn>
      ))}
    </div>
  )
}