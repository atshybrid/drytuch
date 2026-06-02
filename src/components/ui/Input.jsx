export default function Input({
  label,
  error,
  className = '',
  as: Component = 'input',
  rows,
  ...props
}) {
  const fieldClass = `input-field ${error ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`;

  return (
    <div className="w-full">
      {label ? (
        <label className="mb-1.5 block text-sm font-medium text-white/70">
          {label}
        </label>
      ) : null}
      {Component === 'textarea' ? (
        <textarea rows={rows || 4} className={fieldClass} {...props} />
      ) : (
        <input className={fieldClass} {...props} />
      )}
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
