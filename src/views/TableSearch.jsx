import React, { useState } from 'react';

const TableSearch = () => {
  const initialData = [
    { id:1, name: "John Doe", age: 25, city: "New York", phone:"9857463258" },
    { id:2, name: "Jane Smith", age: 30, city: "Los Angeles", phone:"9247856932" },
    // Add more data as needed
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSearch = () => {
    const searchRegex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive search

    const filteredData = initialData.filter((item) => {
      return Object.values(item).some((value) => searchRegex.test(String(value)));
    });

    setData(filteredData);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    setEditingId(null);
    // Implement save logic here, e.g., update the backend or local storage
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter wildcard search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                {editingId === item.id ? (
                  <input type="text" value={item.name} onChange={(e) => setData(data.map((d) => (d.id === item.id ? { ...d, name: e.target.value } : d)))} />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input type="number" value={item.age} onChange={(e) => setData(data.map((d) => (d.id === item.id ? { ...d, age: parseInt(e.target.value, 10) } : d)))} />
                ) : (
                  item.age
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input type="text" value={item.city} onChange={(e) => setData(data.map((d) => (d.id === item.id ? { ...d, city: e.target.value } : d)))} />
                ) : (
                  item.city
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input type="text" maxLength={10} value={item.phone} onChange={(e) => setData(data.map((d) => (d.id === item.id ? { ...d, phone: e.target.value } : d)))} />
                ) : (
                  item.phone
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <button onClick={() => handleSave(item.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSearch;
