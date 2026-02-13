function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 p-4 border-r">
      <p className="font-semibold mb-2">Menu</p>
      <ul className="space-y-2">
        <li>Dashboard</li>
        <li>Components</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
