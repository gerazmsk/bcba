import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Checkbox({ label, error, className = '', ...props }: CheckboxProps) {
  return (
    <div className="w-full">
      <label className="flex items-center">
        <input
          type="checkbox"
          className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />
        <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

