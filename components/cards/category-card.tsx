import { Card } from "@/components/ui/card";

export function CategoryCard({ title, icon }: { title: string; icon: string }) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-lg">
        {icon}
      </div>
      <div className="text-sm font-semibold">{title}</div>
    </Card>
  );
}
