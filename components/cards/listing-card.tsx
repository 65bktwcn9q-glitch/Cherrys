import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ListingCard({
  id,
  title,
  price,
  currency,
  game,
  category,
  coverUrl,
  seller,
  createdAt,
  snippet
}: {
  id: string;
  title: string;
  price: number;
  currency: string;
  game: string;
  category: string;
  coverUrl: string | null;
  seller: string;
  createdAt: Date;
  snippet: string;
}) {
  return (
    <Link href={`/listing/${id}`}>
      <Card className="group h-full overflow-hidden transition hover:-translate-y-1">
        <div className="relative h-40 bg-secondary/40">
          {coverUrl ? (
            <Image src={coverUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Без изображения</div>
          )}
        </div>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <Badge>{game}</Badge>
            <span>{category}</span>
          </div>
          <div className="mt-3 text-base font-semibold line-clamp-2">{title}</div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{snippet}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-sm">
          <div className="font-semibold">
            {price} {currency}
          </div>
          <div className="text-muted-foreground">@{seller}</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
