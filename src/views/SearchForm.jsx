import React, { useState } from "react";

const SearchForm = () => {
  const initialData = [
    { name: "John Doe", age: 25, city: "New York", phone: "9857463258" },
    { name: "Jane Smith", age: 30, city: "Los Angeles", phone: "9247856932" },
    // Add more data as needed
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const searchRegex = new RegExp(searchTerm, "i"); // 'i' for case-insensitive search

    const filteredData = initialData.filter((item) => {
      return Object.values(item).some((value) => searchRegex.test(value));
    });

    setData(filteredData);
  };

    //   useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/api/getMembers")
  //       .then((response) => {
  //         console.log(response);
  //         if (response.status === 200) {
  //           setTableData(response.data);
  //         }
  //       })

  //       .catch((error) => console.error("Error fetching data:", error));
  //   }, [data]);
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
            <th>Phone</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.phone}</td>
              <td>{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchForm;
