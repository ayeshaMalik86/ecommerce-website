import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-xl shadow-soft">
      <div className="aspect-[4/3] bg-muted animate-pulse rounded-t-xl" />
      <CardContent className="p-4 space-y-3">
        <div className="h-6 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-8 bg-muted rounded w-20 animate-pulse" />
      </CardFooter>
    </Card>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
