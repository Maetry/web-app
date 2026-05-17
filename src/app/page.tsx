import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="bg-card text-card-foreground w-full max-w-md rounded-xl border p-8 text-center shadow-sm">
        <h1 className="text-foreground text-2xl font-semibold">Maestri</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Заглушка. Интерфейс будет реализован заново на shadcn / Base UI.
        </p>
        <Button className="mt-6">Готово к разработке</Button>
      </div>
    </main>
  );
}
