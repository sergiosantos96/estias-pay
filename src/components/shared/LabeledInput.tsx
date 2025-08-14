import React from "react";

type CommonProps = {
  id: string;
  label: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  required?: boolean;
};

type InputFieldProps = CommonProps & {
  as?: "input";
  type?: string;
};

type TextareaFieldProps = CommonProps & {
  as: "textarea";
  rows?: number;
};

type SelectFieldProps = CommonProps & {
  as: "select";
  options: { label: string; value: string | number }[];
};

type LabeledFieldProps =
  | InputFieldProps
  | TextareaFieldProps
  | SelectFieldProps;

const LabeledField: React.FC<LabeledFieldProps> = (props) => {
  const {
    id,
    label,
    value,
    onChange,
    className = "",
    inputClassName = "",
    placeholder,
    required = false,
  } = props;

  return (
    <div className={className}>
      <label htmlFor={id} className="text-md mb-1 block text-gray-700">
        {label}
      </label>

      {props.as === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={props.rows ?? 4}
          placeholder={placeholder}
          maxLength={100}
          className={`w-full resize-none rounded border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClassName}`}
        />
      ) : props.as === "select" ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className={`mb-3 w-full rounded border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClassName}`}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={props.type ?? "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`mb-3 w-full rounded border border-gray-300 bg-gray-50 p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none ${inputClassName}`}
        />
      )}
    </div>
  );
};

export default LabeledField;
