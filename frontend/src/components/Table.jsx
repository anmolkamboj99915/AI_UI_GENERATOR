function Table({ data }) {
  if (!data || data.length === 0) {
    return <div>No Data</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table className="w-full border">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="border p-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header} className="border p-2">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
