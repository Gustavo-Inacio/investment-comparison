import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-svh">
      <div className={"flex flex-col gap-6"} >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Comparador de Investimentos</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Bem vindo ao Comparador de Investimentos!
          </p>
        </div>
        <div className="grid gap-6">
          <Link href="/dashboard/fixed-income-investment/list">
            <Button type="button" className="w-full">
              Conhecer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
