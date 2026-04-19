'use client'

export interface InvestmentListingBlockProps {
  blockTitle?: string;
  children?: React.ReactNode;
}

export const InvestmentListingBlock = ({ blockTitle, children }: InvestmentListingBlockProps) => {
  return (
    <div>
      <div>
        <h3>{blockTitle}</h3>
      </div>
      {children}
    </div>
  );
}