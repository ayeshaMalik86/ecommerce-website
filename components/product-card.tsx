"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { useFavorites } from "@/lib/store";
import { format } from "date-fns";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <Link href={`/products/${product.id}`} className="block">
      <Card className="overflow-hidden rounded-xl border-border/80 bg-card shadow-soft transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-soft-hover group">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-background/90 shadow-soft hover:bg-background"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                favorite ? "fill-accent text-accent" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="line-clamp-2 text-base font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
              {product.title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">·</span>
              <span className="capitalize text-muted-foreground">{product.category}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div className="space-y-0.5">
            <p className="text-xl font-semibold text-foreground">${product.price}</p>
            {product.dateAdded && (
              <p className="text-xs text-muted-foreground">
                Added {format(new Date(product.dateAdded), "MMM d, yyyy")}
              </p>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
