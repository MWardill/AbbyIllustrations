import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="form-control w-full">
                <label className="label py-1">
                    <span className="label-text text-xs font-medium">{label}</span>
                </label>
                <input
                    ref={ref}
                    className={`input input-bordered input-sm w-full text-xs ${error ? 'input-error' : ''} ${className || ''}`}
                    {...props}
                />
                {error && <span className="text-error text-[10px] mt-1">{error.message}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
