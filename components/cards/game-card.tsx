import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function GameCard({
  slug,
  title,
  coverUrl,
  description
}: {
  slug: string;
  title: string;
  coverUrl: string;
  description: string;
}) {
  return (
    <Link href={`/games/${slug}`}>
      <Card className="overflow-hidden transition hover:-translate-y-1">
        <div className="relative h-36">
          <Image src={coverUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 300px" />
        </div>
        <CardContent>
          <div className="font-semibold">{title}</div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
