import './FormInput.css';

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
}

export const FormInput = ({
  id,
  label,
  value,
  onChange,
  hint,
  required = false,
}: FormInputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {hint && <span className="range-hint">{hint}</span>}
      </label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
};
