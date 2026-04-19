export enum IndexRateEnum {
  PRE = 'Pré',
  CDI = 'CDI',
  IPCA = 'IPCA',
  SELIC = 'SELIC',
}

export enum InvestmentTypeEnum {
  TESOURO_DIRETO = 'Tesouro Direto',
  LCI_LCA = 'LCI / LCA',
  CDB = 'CDB',
  CUSTOMIZADO = 'Customizado',
}

export enum ContributionFrequencyEnum {
  DIA = 'DIÁRIO',
  SEMANA = 'SEMANUAL',
  MES = 'MENSAL',
  ANO = 'ANUAL',
}

export enum LiquidityEnum {
  NO_FINAL = 'No Final',
  SEMESTRAL = 'Semestral',
  ANUAL = 'Anual',
  DIARIA = 'Diária',
}

export interface Investment {
  id: string;
  name: string;
  dueDate: Date;
  rate: {
    type: IndexRateEnum;
    indexRate: number;
    yearAddedRate: number;
  };
  type: InvestmentTypeEnum;
  initialContribution: number;
  contribution: {
    amount: number;
    frequency: ContributionFrequencyEnum;
  };
  liquidity: LiquidityEnum;
  }

