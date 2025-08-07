import React, { useState } from "react";
import LabeledInput from "./shared/LabeledInput";
import Button from "./shared/Button";

interface ExpenseData {
  category: string;
  amount: string;
  date: string;
  notes: string;
}

interface AddExpenseProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExpenseData) => void;
}

const AddExpenseModal: React.FC<AddExpenseProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 text-gray-600 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Add New Expense
        </h2>
        <LabeledInput
          as="select"
          id="category"
          label="Category"
          value={category}
          options={[
            { label: "Housing", value: "housing" },
            { label: "Food", value: "food" },
            { label: "Transportation", value: "transport" },
          ]}
          onChange={(e) => setCategory(e.target.value)}
        />
        <LabeledInput
          id="budget"
          label="Amount (€)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <LabeledInput
          id="date"
          label="Date"
          type="date"
          placeholder="DD/MM/YYYY"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <LabeledInput
          as="textarea"
          id="notes"
          label="Notes (Optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button
            className="rounded-lg !border-gray-200 !bg-gray-100 !text-gray-700 hover:!bg-gray-200"
            onClick={onClose}
            text="Cancel"
          />
          <Button
            className="rounded-lg"
            onClick={() => {
              onSubmit({ category, amount, date, notes });
              onClose();
            }}
            text="Set budget"
          />
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;
