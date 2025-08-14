import React, { useState } from "react";
import LabeledInput from "./shared/LabeledInput";
import Button from "./shared/Button";
import type { AddExpenseProps } from "../models/models";
import { expenseCategories } from "../constants/categories";
import UnsavedChangesModal from "./shared/UnsavedChangesModal";

const AddExpenseModal: React.FC<AddExpenseProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const resetForm = () => {
    setCategory("");
    setAmount("");
    setDate("");
    setNotes("");
  };

  const maxChars = 100;

  const hasUnsavedChanges = () => {
    return category || amount || date || notes;
  };

  const handleCloseAttempt = () => {
    if (hasUnsavedChanges()) {
      setShowWarning(true);
    } else {
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    setShowWarning(false);
    resetForm();
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
            onSubmit({ category, amount, date, notes });
            resetForm();
            onClose();
          }}
        >
          <h2 className="mb-4 text-center text-2xl font-semibold">
            Add New Expense
          </h2>
          <LabeledInput
            as="select"
            id="category"
            label="Category"
            required={true}
            value={category}
            options={expenseCategories}
            onChange={(e) => setCategory(e.target.value)}
          />
          <LabeledInput
            id="budget"
            label="Amount (€)"
            type="number"
            required={true}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <LabeledInput
            id="date"
            label="Date"
            type="date"
            placeholder="DD/MM/YYYY"
            required={true}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <LabeledInput
            as="textarea"
            id="notes"
            label="Notes (Optional)"
            value={notes}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                setNotes(e.target.value);
              }
            }}
          />
          <p className="mb-2 text-right text-xs text-gray-500">
            {maxChars - notes.length} characters left
          </p>
          <div className="flex justify-end gap-2">
            <Button
              className="rounded-lg !border-gray-200 !bg-gray-100 !text-gray-700 hover:!bg-gray-200"
              onClick={() => {
                onClose();
                resetForm();
              }}
              text="Cancel"
            />
            <Button className="rounded-lg" text="Set budget" type="submit" />
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

export default AddExpenseModal;
