export interface ExpenseData {
  id?: number;
  category: string;
  amount: string;
  date: string;
  notes?: string;
}

export interface AddExpenseProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExpenseData) => void;
}

export interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: string) => void;
}

export interface CurrentBalanceProps {
  expenses: number;
  income: number;
}

export interface ProgressBarProps {
  barColor: string;
  width: number;
}

export interface SpendingCategory {
  category: string;
  expense: number;
}

export interface ButtonProps {
  text?: string;
  type?: "button" | "submit";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface FilterProps {
  category: string;
  minPrice: string;
  maxPrice: string;
  minDate: string;
  maxDate: string;
}

export interface AddFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FilterProps) => void;
  onResetFilters: () => void;
}

export interface UnsavedChangesModalProps {
   isOpen: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onClose?: () => void;
}

export const topLevelCategoryMap: Record<string, string> = {
  housing: "Housing",
  utilities: "Utilities",
  food: "Food & Drinking",
  transportation: "Utilities",
  insurance: "Housing",
  healthcare: "Utilities",
  debt: "Utilities",
  savings: "Utilities",
  personal_care: "Utilities",
  entertainment: "Food & Drinking",
  education: "Utilities",
  gifts_donations: "Food & Drinking",
  childcare: "Utilities",
  pet_care: "Utilities",
  clothing: "Food & Drinking",
  subscriptions: "Utilities",
  misc: "Utilities",
};

export interface SpendingCategoriesProps {
  expenses: ExpenseData[];
}

export interface SpendingCategoryProps {
  category: string;
  expense: number;
  percentage: number;
}