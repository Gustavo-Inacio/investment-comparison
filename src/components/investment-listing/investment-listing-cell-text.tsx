'use client'

export const InvestmentListingCellText = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
      {children}
    </span>
  );
}