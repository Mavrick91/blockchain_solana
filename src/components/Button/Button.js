import ClipLoader from "react-spinners/ClipLoader";

const Button = ({ children, onClick, className, icon, isLoading }) => (
  <button
    className={`inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
    disabled={isLoading}
    onClick={onClick}
  >
    {children}
    {!isLoading ? (
      icon
    ) : (
      <ClipLoader
        color="white"
        cssOverride={{ marginLeft: "10px" }}
        size={16}
      />
    )}
  </button>
);

export default Button;
