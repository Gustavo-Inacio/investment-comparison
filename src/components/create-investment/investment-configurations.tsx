import { Label } from "@/components/ui/label"
import { CalendarPicker } from "../input/calendarPicker";
import { InvestmentRateSelect } from "../select/investment-rate-select";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { FieldGroup, FieldLabel, FieldDescription, FieldError, Field } from "../ui/field";
import { Controller, UseFormReturn } from "react-hook-form";
import { CalendarInputField, InputField, SelectInputField } from "../input/createInvestmentInput";
import z from "zod";
import { withMask } from "../input/input-mask.helper";
import { formatBRLFromCents, parseBRLToCents } from "../input/currency.helper";
import { withIntlPercentMask } from "../input/percentage.helper";

export const createInvestmentsConfiguration = z.object({
    name: z.string().min(3, { error: "O nome do investimento é obrigatório, e deve ter pelo menos 3 caracteres" }),
    dueDate: z.date({ error: "A data de vencimento é obrigatória" }),
    indexRateType: z.string().min(1, { error: "O índice é obrigatório" }),
    indexRate: z.number().min(0, { error: "A taxa do índice deve ser maior ou igual a 0" }),
    yearRateAdd: z.string().min(1, { error: "A taxa anual adicional é obrigatória" }),
    type: z.string().min(1, { error: "O tipo de investimento é obrigatório" }),
})



export interface ICreateInvestmentsConfigurationData {
  name: string | undefined;
  dueDate: Date | undefined;
  indexRateType: string | undefined;
  indexRate: number | undefined;
  yearRateAdd: string | undefined;
  type: string | undefined;
}

interface ICreateInvestmentsConfigurationProps {
  // data: ICreateInvestmentsConfigurationData;
  // onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | undefined) => void;
  form: UseFormReturn<z.infer<typeof createInvestmentsConfiguration>, any>;
}

export function CreateInvestmentsConfiguration ({form}: ICreateInvestmentsConfigurationProps) {
  console.log('form', form);
  return (
    <Card className="rounded-[0] g-[0px]">
        <CardContent className="flex flex-col gap-6">
          <div className="flex lg:flex-row flex-col gap-6">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputField 
                    field={field}
                    fieldState={fieldState}
                    formState={form.formState}
                    content={{
                      label: "Nome do Investimento",
                      description: "Digite um nome para identificar seu investimento",
                      placeholder: "CDB BMG 2027 SELIC + 0.07"
                    }}
                  />
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="dueDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <CalendarInputField 
                    field={field}
                    fieldState={fieldState}
                    formState={form.formState}
                    content={{
                      label: "Vencimento",
                      description: "Selecione a data de vencimento do seu investimento",
                      placeholder: "shadcn"
                    }}
                  />
                )}
              />
            </FieldGroup>
            </div>
            <div className="flex lg:flex-row flex-col gap-6">
              <FieldGroup>
                <Controller 
                  name="indexRateType"
                  control={form.control}
                  render={({field, fieldState}) => {
                    return (
                      <SelectInputField field={field} fieldState={fieldState} content={{
                        label: "Taxa Indexadora",
                        description: "Selecione a taxa indexadora do seu investimento",
                        options: ['IPCA', 'CDI', 'SELIC', 'PREFIXADO'],
                        
                      }}/>
                    );
                  }}
                />
              </FieldGroup>
              <div className="flex flex-row gap-2 items-center w-full">
                <FieldGroup>
                  <Controller
                    name="indexRate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <InputField 
                        field={withIntlPercentMask(field)}
                        fieldState={fieldState}
                        formState={form.formState}
                        content={{
                          label: "Índice de juros (% a.a.)",
                          description: "Valor de juros",
                          placeholder: "100"
                        }}
                      />
                    )}
                  />
                </FieldGroup> 
                <span className="text-nowrap">do(a) {form.watch("indexRateType")} +</span>
                <FieldGroup>
                  <Controller
                    name="yearRateAdd"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <InputField 
                        field={field}
                        fieldState={fieldState}
                        formState={form.formState}
                        content={{
                          label: "",
                          description: "",
                          placeholder: "100%"
                        }}
                      />
                    )}
                  />
                </FieldGroup>
              </div>
              
                          {/* <div className="flex flex-col gap-2 max-w-[500px]">
                <Label htmlFor="" className="text-stone-950 font-semibold">Tipo do Investimento</Label>
                <InvestmentRateSelect options={['Tesouro Direto', 'LCI / LCA', 'CDB', 'Customizado']} label="Tipo do Investimento" name="type" onChange={onChange} value={data.type} />
              </div> */}
            </div>
            <FieldGroup>
                <Controller 
                  name="type"
                  control={form.control}
                  render={({field, fieldState}) => {
                    return (
                      <SelectInputField field={field} fieldState={fieldState} content={{
                        label: "Tipo do Investimento",
                        description: "Selecione o tipo do seu investimento",
                        options: ['Tesouro Direto', 'LCI / LCA', 'CDB', 'Customizado'],
                        
                      }}/>
                    );
                  }}
                />
              </FieldGroup>
          
            {/* <div className="flex flex-col gap-2 lg:w-[70%] lg:justify-center">
              <Label htmlFor="investment-name" className="text-stone-950 font-semibold" >Nome do Investimento</Label>
              <Input required={true} type="text" id="investment-name" name="name" placeholder="CDB BMG 2027 SELIC + 0.07" value={data.name} onChange={onChange}/>
            </div>
            <div className="flex flex-col gap-2">
              <CalendarPicker 
                labelText="Data do Investimento" 
                placeholderText="Selecione uma data"
                name="dueDate"
                onSelectDate={onChange}
                label={<Label htmlFor="date" className="text-stone-950 font-semibold">Data de Vencimento</Label>}
                />
            </div>
          </div>

            <div className="flex flex-col gap-2 max-w-[500px]">
              <Label htmlFor="interest-rate" className="text-stone-950 font-semibold">Taxa Indexadora</Label>
              <InvestmentRateSelect options={['IPCA', 'CDI', 'SELIC', 'PREFIXADO']} label="Taxa Indexadora" name="index" onChange={onChange} value={data.index}/>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="" className="text-stone-950 font-semibold">Valor de juros do investimento:</Label>
              <div className="flex flex-row gap-2 items-center">
                <InputPercentage type="text" placeholder="100%" className="max-w-[80px]" name="indexRate" value={data.indexRate} onChange={onChange} /> da taxa +
                <InputPercentage type="text" placeholder="100%" className="max-w-[80px]" name="yearRateAdd" value={data.yearRateAdd} onChange={onChange} /> ao ano
              </div>
            </div>

            <div className="flex flex-col gap-2 max-w-[500px]">
              <Label htmlFor="" className="text-stone-950 font-semibold">Tipo do Investimento</Label>
              <InvestmentRateSelect options={['Tesouro Direto', 'LCI / LCA', 'CDB', 'Customizado']} label="Tipo do Investimento" name="type" onChange={onChange} value={data.type} />
            </div>
           */}
           {/* </div> */}
        </CardContent>
    </Card>
  )
}