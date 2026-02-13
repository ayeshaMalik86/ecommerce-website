"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/loading-skeleton";
import { DateRangePicker } from "@/components/date-range-picker";
import { Product, DateRange } from "@/lib/types";
import { enrichProductsWithDates, filterProductsByDateRange } from "@/lib/date-utils";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  // Fetch all products and categories
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesRes = await fetch("https://dummyjson.com/products/categories");
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
        
        // Fetch all products (we need all for date filtering)
        const productsRes = await fetch("https://dummyjson.com/products?limit=200");
        const productsData = await productsRes.json();
        
        // Enrich products with dates
        const enrichedProducts = enrichProductsWithDates(productsData.products);
        setProducts(enrichedProducts);
        
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter and paginate products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (debouncedSearch) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Date range filter
    filtered = filterProductsByDateRange(filtered, dateRange?.from, dateRange?.to);

    return filtered;
  }, [products, debouncedSearch, selectedCategory, dateRange]);

  // Paginate
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, dateRange]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setDateRange({ from: undefined, to: undefined });
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "all" || dateRange?.from || dateRange?.to;

  if (error) {
    return (
      <div className="container py-16 text-center">
        <p className="text-destructive text-lg">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Page header – design system style */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">
          {filteredProducts.length} products
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Products
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Best selection of products for your inspiration
        </p>
      </div>

      {/* Filter bar – soft background, 8px radius */}
      <div className="space-y-4">
        <div className="rounded-lg bg-muted/70 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg border-border/80 bg-background"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="rounded-lg border-border/80 bg-background">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories
                  .filter((c) => typeof c === "string")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {/* Date Range Picker */}
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </div>

        {/* Active Filters Info */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {filteredProducts.length} products found
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <ProductGridSkeleton />
      ) : paginatedProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No products found matching your criteria
          </p>
          <Button className="mt-4" onClick={handleClearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                -
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    );
                  })
                  .map((page, index, array) => {
                    if (index > 0 && page - array[index - 1] > 1) {
                      return (
                        <span key={`ellipsis-${page}`} className="px-2">
                          ...
                        </span>
                      );
                    }
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                +
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
