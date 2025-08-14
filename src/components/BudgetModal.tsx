import { useState } from "react";
import Button from "./shared/Button";
import LabeledInput from "./shared/LabeledInput";
import type { BudgetModalProps } from "../models/models";
import UnsavedChangesModal from "./shared/UnsavedChangesModal";

const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const resetAmount = () => {
    setAmount("");
  };

  const hasUnsavedChanges = () => {
    return amount;
  };

  const handleCloseAttempt = () => {
    if (hasUnsavedChanges()) {
      setShowWarning(true);
    } else {
      resetAmount();
      onClose();
    }
  };

  const handleClose = () => {
    setShowWarning(false);
    resetAmount();
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
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Set Monthly Budget
        </h2>
        <LabeledInput
          id="budget"
          label="Budget Amount (€)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button
            className="rounded-lg !border-gray-200 !bg-gray-100 !text-gray-700 hover:!bg-gray-200"
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
      <UnsavedChangesModal
        isOpen={showWarning}
        onSave={handleStayAndClose}
        onDiscard={handleClose}
        onClose={() => setShowWarning(false)}
      />
    </div>
  );
};

export default BudgetModal;
