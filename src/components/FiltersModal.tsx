import { expenseCategories } from "../constants/categories";
import LabeledInput from "./shared/LabeledInput";
import type { AddFilterProps } from "../models/models";

import React, { useState } from "react";
import Button from "./shared/Button";
import UnsavedChangesModal from "./shared/UnsavedChangesModal";

const FiltersModal: React.FC<AddFilterProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onResetFilters,
}) => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const resetFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setMinDate("");
    setMaxDate("");
  };

  const hasUnsavedChanges = () => {
    return category || minPrice || maxPrice || minDate || maxDate;
  };

  const handleCloseAttempt = () => {
    if (hasUnsavedChanges()) {
      setShowWarning(true);
    } else {
      resetFilters();
      onClose();
    }
  };

  const handleClose = () => {
    setShowWarning(false);
    resetFilters();
    onClose();
  };

  const handleStayAndClose = () => {
    setShowWarning(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 text-gray-600 backdrop-blur-xs"
      onClick={handleCloseAttempt}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ category, minPrice, maxPrice, minDate, maxDate });
            resetFilters();
            onClose();
          }}
        >
          <h2 className="mb-4 text-center text-2xl font-semibold">
            Filter expenses
          </h2>
          <LabeledInput
            as="select"
            id="category"
            label="Category"
            value={category}
            required={false}
            options={expenseCategories}
            onChange={(e) => setCategory(e.target.value)}
          />
          <div className="flex items-center justify-center gap-4">
            <LabeledInput
              id="minPrice"
              label="Min Price (€)"
              type="number"
              placeholder="Min Price"
              value={minPrice}
              required={false}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <LabeledInput
              id="maxPrice"
              label="Max Price (€)"
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              required={false}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <LabeledInput
              id="minDate"
              label="Date Range (min)"
              type="date"
              className="flex-1"
              placeholder="DD/MM/YYYY"
              value={minDate}
              required={false}
              onChange={(e) => setMinDate(e.target.value)}
            />
            <LabeledInput
              id="maxDate"
              label="Date Range (max)"
              type="date"
              className="flex-1"
              placeholder="DD/MM/YYYY"
              value={maxDate}
              required={false}
              onChange={(e) => setMaxDate(e.target.value)}
            />
          </div>
          <div className="mt-2 flex justify-end gap-2">
            <Button
              className="rounded-lg !border-gray-200 !bg-gray-100 !text-gray-700 hover:!bg-gray-200"
              onClick={() => {
                onResetFilters();
                onClose();
              }}
              text="Reset filters"
            />
            <Button className="rounded-lg" text="Apply filters" type="submit" />
          </div>
        </form>
      </div>
      <UnsavedChangesModal
        isOpen={showWarning}
        onSave={handleStayAndClose}
        onDiscard={handleClose}
        onClose={() => setShowWarning(false)}
      />
    </div>
  );
};

export default FiltersModal;
