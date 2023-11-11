'use client'
// pages/index.js
import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import Select from 'react-select';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles

const dummyData = [
  { id: 1, name: 'John Doe', age: 25, city: 'New York' },
  { id: 2, name: 'Jane Doe', age: 30, city: 'San Francisco' },
  // Add more dummy data as needed
];

const filterOptions = [
  { value: 'name', label: 'Name' },
  { value: 'age', label: 'Age' },
  { value: 'city', label: 'City' },
];

const IndexPage = () => {
  const [data, setData] = useState(dummyData);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (selectedOption) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(selectedOption.value)) {
        return prevFilters.filter((filter) => filter !== selectedOption.value);
      } else {
        return [...prevFilters, selectedOption.value];
      }
    });
  };

  // Define your table columns
  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'City', accessor: 'city' },
    ],
    []
  );

  // Create a table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  
  useEffect(() => {
    // Filter data based on selected filters
    const filteredData = dummyData.filter((row) =>
      selectedFilters.every((filter) => row[filter] !== undefined)
    );
  
    // Update data when filters change
    setData(filteredData);
  }, [selectedFilters]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <div className="w-1/6 p-4 bg-gray-200 rounded-l justify-center">
          <h4 className="text-lg font-bold mb-4">Filters</h4>
          {filterOptions.map((filter) => (
            <label key={filter.value} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedFilters.includes(filter.value)}
                onChange={() => handleFilterChange(filter)}
                className="mr-2"
              />
              {filter.label}
            </label>
          ))}
        </div>
        <div className="w-5/6 p-4 bg-gray-100 rounded-r overflow-auto">
          <h1 className="text-3xl mb-4">PostgreSQL Data Table</h1>
          <br/>
          <table {...getTableProps()} className="w-full border border-collapse border-black">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="p-2 font-semibold border-t"
                >
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-200">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="p-2 border-t">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Footer Content */}
     
    </div>
  );
  };

export default IndexPage;
