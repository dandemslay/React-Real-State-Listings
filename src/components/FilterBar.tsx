import React from 'react';
import { FilterOptions } from '../types/listing';
import { formatPrice } from '../utils/formatters';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value === '' ? '' : Number(value),
    });
  };

  const minPrice = 100000;
  const maxPrice = 3000000;
  const step = 10000;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}+ beds
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <select
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}+ baths
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parking Spaces
          </label>
          <select
            name="parking"
            value={filters.parking}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num}+ spaces
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range: {formatPrice(Number(filters.priceMax) || maxPrice)}
          </label>
          <div>
            <input
              type="range"
              name="priceMax"
              min={minPrice}
              max={maxPrice}
              step={step}
              value={filters.priceMax || maxPrice}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{formatPrice(minPrice)}</span>
              <span>{formatPrice(maxPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
