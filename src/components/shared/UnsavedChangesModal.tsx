import React from "react";
import Button from "./Button";
import type { UnsavedChangesModalProps } from "../../models/models";
import { CiWarning } from "react-icons/ci";

const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
  isOpen,
  onSave,
  onDiscard,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/30"
      onClick={() => onClose && onClose()}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex flex-col items-center justify-center">
          <CiWarning size={45} color="#EAB308" />
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            Unsaved Changes
          </h2>
        </div>
        <p className="text-md mb-4 text-center text-gray-500">
          You have unsaved changes. Do you want to stay or leave?
        </p>
        <div className="flex justify-center gap-4">
          <Button
            className="!hover:bg-red-500 rounded-lg !border-red-400 !bg-red-400"
            onClick={onDiscard}
            text="Leave"
          />
          <Button className="rounded-lg" onClick={onSave} text="Stay" />
        </div>
      </div>
    </div>
  );
};

export default UnsavedChangesModal;
