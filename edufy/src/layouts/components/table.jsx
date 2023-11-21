// MyTable.js
import React from "react";
import { useTable, useFilters } from "react-table";

function DefaultColumnFilter({ column }) {
  const { filterValue, setFilter, filterFunction } = column;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(filterFunction(e.target.value))}
      placeholder="Filter..."
    />
  );
}

function TableComponent({ columns, data }) {
  const tableInstance = useTable({ columns, data }, useFilters);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table
      {...getTableProps()}
      className="w-full border-collapse border border-gray-300"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                key={column.id}
                className="border-b bg-gray-200 p-1 text-center text-black justify-center"
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
            <tr
              {...row.getRowProps()}
              key={row.id}
              className="border-b text-center"
            >
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  key={cell.column.id}
                  className="p-1 border-r border-gray-300 text-center"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function MyTable({ data }) {
  // Memoize columns outside the component unconditionally
  const columns = React.useMemo(
    () =>
      Object.keys(data[0]).map((header) => ({
        Header: header,
        accessor: header,
        Filter: DefaultColumnFilter,
        filterFunction: (value) => value,
      })),
    [data]
  );

  // Ensure data is defined
  if (!data || data.length === 0) {
    console.error("Invalid data structure:", data);
    return <p>No valid data available</p>;
  }

  return (
    <div className="w-full overflow-x-auto max-w-screen-2xl">
      <TableComponent columns={columns} data={data} />
    </div>
  );
}

export default MyTable;
