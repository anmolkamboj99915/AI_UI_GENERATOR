function Card({ title, children }) {
  return (
    <div className="border rounded p-4 shadow-sm bg-white h-full min-h-[500px]">
      {title && (
        <h3 className="font-semibold mb-4 text-lg">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export default Card;
