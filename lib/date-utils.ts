import { Product } from "./types";

// Seeded random number generator for consistent dates
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate a consistent date for a product based on its ID
export function generateProductDate(productId: number): string {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  
  // Use product ID as seed for consistent date generation
  const randomValue = seededRandom(productId);
  const timeDiff = now.getTime() - sixMonthsAgo.getTime();
  const randomTime = sixMonthsAgo.getTime() + (randomValue * timeDiff);
  
  return new Date(randomTime).toISOString();
}

// Add date to products
export function enrichProductsWithDates(products: Product[]): Product[] {
  return products.map(product => ({
    ...product,
    dateAdded: generateProductDate(product.id)
  }));
}

// Filter products by date range
export function filterProductsByDateRange(
  products: Product[],
  from: Date | undefined,
  to: Date | undefined
): Product[] {
  if (!from && !to) return products;

  return products.filter(product => {
    if (!product.dateAdded) return true;

    const productDate = new Date(product.dateAdded);

    if (from && to) {
      // Full range: from start of "from" to end of "to"
      const startOfFrom = new Date(from);
      startOfFrom.setHours(0, 0, 0, 0);
      const endOfTo = new Date(to);
      endOfTo.setHours(23, 59, 59, 999);
      return productDate >= startOfFrom && productDate <= endOfTo;
    }

    if (from) {
      // Single date selected: filter to that day only (start to end of day)
      const startOfDay = new Date(from);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(from);
      endOfDay.setHours(23, 59, 59, 999);
      return productDate >= startOfDay && productDate <= endOfDay;
    }

    if (to) {
      const startOfDay = new Date(to);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(to);
      endOfDay.setHours(23, 59, 59, 999);
      return productDate >= startOfDay && productDate <= endOfDay;
    }

    return true;
  });
}
