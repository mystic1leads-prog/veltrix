import type { InputHTMLAttributes } from "react";

export function FormField({
  label,
  name,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-medium text-graphite-600">
        {label}
        {props.required && (
          <span aria-hidden="true" className="ml-1 text-ember-600">
            *
          </span>
        )}
      </span>
      <input name={name} className="field" {...props} />
    </label>
  );
}
export function FormNotice({ message }: { message: string }) {
  return message ? (
    <p
      role="status"
      aria-live="polite"
      className="rounded-lg border border-graphite-200 bg-graphite-50 px-4 py-3 text-xs leading-6 text-graphite-700"
    >
      {message}
    </p>
  ) : null;
}
