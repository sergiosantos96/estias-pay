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

export interface CurrentBalance {
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
