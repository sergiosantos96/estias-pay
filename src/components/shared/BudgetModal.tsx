import { useState } from "react";
import Button from "./Button";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: string) => void;
}

const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-600">
          Set Monthly Budget
        </h2>
        <input
          type="number"
          placeholder="Budget Amount €"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-6 w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        <div className="flex justify-end gap-2">
          <Button
            className="!hover:bg-gray-200 rounded-lg !border-gray-700 !bg-gray-100 !text-gray-700"
            onClick={onClose}
            text="Cancel"
          />
          <Button
            className="rounded-lg"
            onClick={() => {
              onSubmit(amount);
              onClose();
            }}
            text="Set budget"
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;
