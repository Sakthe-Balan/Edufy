// MyTable.js
import React from "react";
import { useTable, useFilters } from "react-table";

interface MyTableProps {
  data: { [key: string]: any }[];
}

// Define a custom filter UI component
function DefaultColumnFilter({
  column: { filterValue, setFilter, filterFunction },
}) {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(filterFunction(e.target.value))}
      placeholder="Filter..."
    />
  );
}

function MyTable({ data }: MyTableProps) {
  // Ensure data is defined
  if (!data || data.length === 0) {
    console.error("Invalid data structure:", data);
    return <p>No valid data available</p>;
  }

  // Use react-table hooks
  const columns = React.useMemo(
    () =>
      Object.keys(data[0]).map((header) => ({
        Header: header,
        accessor: header,
        Filter: DefaultColumnFilter, // Add the filter UI component
        filterFunction: (value) => value, // Default filter function
      })),
    [data],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { filters },
  } = useTable({ columns, data }, useFilters);

  return (
    <div className="w-full overflow-x-auto max-w-screen-2xl ">
      <table
        {...getTableProps()}
        className="w-full border-collapse border border-gray-300"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-b bg-gray-200 p-1 text-center text-black justify-center" // Reduced padding to 1
                >
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b text-center">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="p-1 border-r border-gray-300 text-center" // Reduced padding to 1
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MyTable;
