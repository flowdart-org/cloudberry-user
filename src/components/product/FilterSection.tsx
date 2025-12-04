import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import { Input } from "@/components/ui/input";

const FilterSection = () => {
  const [sizeOpen, setSizeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const { filters, toggleSizeFilter, clearFilters, applyFilters, setPriceRange } =
    useProductStore();

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <h2 className="text-sm font-semibold mb-6 tracking-wide">FILTERS</h2>

      {/* Size Filter */}
      <div className={`mb-3 border- border-border ${sizeOpen ? 'pb-4' : '' }`}> <button onClick={() => setSizeOpen(!sizeOpen)} className="flex items-center justify-between w-full text-left text-sm font-semibold mb-4" > SIZE <ChevronDown className={`h-4 w-4 transition-transform ${sizeOpen ? "rotate-180" : ""}`} /> </button>

        {sizeOpen && (
          <div className="space-y-3">
            {sizes.map((size) => (
              <label key={size} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => toggleSizeFilter(size)}
                  className="rounded border-border w-4 h-4 cursor-pointer"
                />
                <span className="text-sm group-hover:text-foreground/80 transition-colors">
                  {size}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className={`mb-6 border-b border-border ${priceOpen ? "pb-6" : ""}`}>
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="flex items-center justify-between w-full text-left text-sm font-semibold mb-4"
        >
          PRICE
          <ChevronDown
            className={`h-4 w-4 transition-transform ${priceOpen ? "rotate-180" : ""}`}
          />
        </button>

        {priceOpen && (
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Min"
              className="text-sm"
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                setPriceRange( Number(e.target.value) || null,  filters.maxPrice )
              }
            />
            <Input
              type="number"
              placeholder="Max"
              className="text-sm"
              value={filters.maxPrice ?? ""}
              onChange={(e) =>
                setPriceRange( filters.minPrice, Number(e.target.value) || null )
              }
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={clearFilters}>
          CLEAR
        </Button>
        <Button className="flex-1" onClick={applyFilters}>
          APPLY
        </Button>
      </div>
    </aside>
  );
};

export default FilterSection;
