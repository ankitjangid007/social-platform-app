import { ReactNode } from 'react';

interface FormFieldProps {
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export const FormField = ({
  htmlFor,
  label,
  required,
  error,
  children,
}: FormFieldProps) => (
  <div className="form-field">
    <label className="form-label" htmlFor={htmlFor}>
      {label}{' '}
      {required && (
        <span className="required-star" aria-hidden="true">
          *
        </span>
      )}
    </label>
    {children}
    {error && (
      <span className="error-message" role="alert">
        ⚠ {error}
      </span>
    )}
  </div>
);
