const Text = ({ label, onChange, className, placeholder, value }) => (
  <div className="sm:col-span-3 flex flex-col items-start">
    <label className="block text-sm font-medium text-white" htmlFor={label}>
      {label}
    </label>
    <div className="mt-1 w-full">
      <input
        autoComplete="given-name"
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
        id={label}
        name={label}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  </div>
);

export default Text;
