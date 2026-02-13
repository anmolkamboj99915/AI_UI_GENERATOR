function Input({ label, value, onChange, type = "text", ...rest }) {
  return (
    <input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label || "placeholder"}
        className="border p-2 rounded w-full"
    />
  );
}

export default Input;