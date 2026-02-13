function Button({ label, onClick, variant = "primary" }) {
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white"
      : "bg-gray-300 text-black";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${styles}`}
    >
      {label}
    </button>
  );
}

export default Button;
