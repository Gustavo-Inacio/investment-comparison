import z from "zod";
import { Card, CardContent } from "../ui/card";
import { Controller, UseFormReturn } from "react-hook-form";
import { FieldGroup } from "../ui/field";
import { InputField, SelectInputField } from "../input/createInvestmentInput";
import { formatBRLFromCents, parseBRLToCents } from "../input/currency.helper";
import { withMask } from "../input/input-mask.helper";

export const createInvestmentsContributionConfiguration = z.object({
    initialContribution: z.number().min(0, { error: "A contribuição inicial é obrigatória" }),
    contributionAmount: z.number().min(0, { error: "O valor da contribuição é obrigatório" }),
    contributionFrequency: z.string().min(1, { error: "A frequência da contribuição é obrigatória" }),
    liquidity: z.string().min(1, { error: "A liquidez é obrigatória" }),
})

// export interface ICreateInvestmentsContributionConfigurationData {
//   initialContribution: string | undefined;
//   contributionAmount: string | undefined;
//   contributionFrequency: string | undefined;
//   liquidity: string | undefined;
// }

interface ICreateInvestmentsContributionConfigurationProps {
  // data: ICreateInvestmentsContributionConfigurationData;
  // onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  form: UseFormReturn<z.infer<typeof createInvestmentsContributionConfiguration>, any>;
  
}

export function CreateInvestmentsContributionConfiguration ({form}: ICreateInvestmentsContributionConfigurationProps) {
   return (
    <Card className="rounded-[0] g-[0px]">
      <CardContent className="flex flex-col gap-6">
        <div className="flex lg:flex-row flex-col gap-6">
          <FieldGroup>
            <Controller
              name="initialContribution"
              control={form.control}
              render={({ field, fieldState }) => (
                <InputField 
                  field={withMask(field, formatBRLFromCents, parseBRLToCents)}
                  fieldState={fieldState}
                  formState={form.formState}
                  content={{
                    label: "Aporte Inicial (R$)",
                    description: "Contribuição inicial do investimento",
                    placeholder: "10000"
                  }}
                />
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="contributionAmount"
              control={form.control}
              render={({ field, fieldState }) => (
                <InputField 
                  field={withMask(field, formatBRLFromCents, parseBRLToCents)}
                  fieldState={fieldState}
                  formState={form.formState}
                  content={{
                    label: "Aporte recorrente",
                    description: "Contribuição recorrente do investimento",
                    placeholder: "10000"
                  }}
                />
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller 
              name="contributionFrequency"
              control={form.control}
              render={({field, fieldState}) => {
                return (
                  <SelectInputField field={field} fieldState={fieldState} content={{
                    label: "Tipo de recorrência",
                    description: "Selecione a frequência de contribuição do seu investimento",
                    options: ['Diário', 'Semanal', 'Mensal', 'Anual'],
                    
                  }}/>
                );
              }}
            />
          </FieldGroup>
          
        '</div>
        <div className="flex lg:flex-row flex-col gap-6">
          <FieldGroup>
            <Controller 
              name="liquidity"
              control={form.control}
              render={({field, fieldState}) => {
                return (
                  <SelectInputField field={field} fieldState={fieldState} content={{
                    label: "Liquidez após",
                    description: "Selecione a liquidez do seu investimento",
                    options: ['No Final', 'Semestral', 'Anual', 'Diária'],
                    
                  }}/>
                );
              }}
            />
          </FieldGroup>
        </div>
      </CardContent>
    </Card>
  )
}