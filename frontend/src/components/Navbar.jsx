function Navbar({ provider }) {
  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800">
        AI UI Generator
      </h1>

      {provider && (
        <div className="text-xs bg-gray-200 px-3 py-1 rounded-full">
          Provider: {provider}
        </div>
      )}
    </div>
  );
}

export default Navbar;
