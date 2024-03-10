import React, { useEffect, useState } from "react";
import MembersTable from "./MembersTable";
import { createClient } from "@supabase/supabase-js";

const TableSearch = () => {
  //   const initialData = [
  //     { id: 1, name: "John Doe", age: 25, city: "New York", phone: "9857463258" },
  //     {
  //       id: 2,
  //       name: "Jane Smith",
  //       age: 30,
  //       city: "Los Angeles",
  //       phone: "9247856932",
  //     },
  //     // Add more data as needed
  //   ];
  const [initialData, setInitialData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    "https://qcohrcnfiuzkzrqbgfzo.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjb2hyY25maXV6a3pycWJnZnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4NDQwNDIsImV4cCI6MjAyMTQyMDA0Mn0.3p7hcsx9qt0gISAUih7gGnG2Y09HpWaVDDXloo6Svxk"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("members-gws").select("*");

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log(data);
          setTableData(data);
          setInitialData(data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [0]);

  const handleSearch = () => {
    const searchRegex = new RegExp(searchTerm, "i"); // 'i' for case-insensitive search

    const filteredData = initialData.filter((item) => {
      return Object.values(item).some((value) =>
        searchRegex.test(String(value))
      );
    });

    setTableData(filteredData);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = async (id, req) => {
    try {
      const { data:updatedData, error } = await supabase
        .from("members-gws")
        .update(req)
        .eq('id', id);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log(updatedData);
        // setTableData(updatedData);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setEditingId(null);
  };
  const handleTableChange = (e, id) => {
    const { name, value } = e.target;
    // console.log(name);
    const updatedData = tableData.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );

    setTableData(updatedData);
    // console.log(updatedData);

    // setTableData((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };

  return (
    <div>
      <div className="flex flex-col items-center sm:flex-row sm:justify-center py-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <input
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 "
            type="text"
            placeholder="Enter wildcard search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* <table>
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
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      setTableData(
                        tableData.map((d) =>
                          d.id === item.id ? { ...d, name: e.target.value } : d
                        )
                      )
                    }
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input
                    type="number"
                    value={item.age}
                    onChange={(e) =>
                      setTableData(
                        tableData.map((d) =>
                          d.id === item.id
                            ? { ...d, age: parseInt(e.target.value, 10) }
                            : d
                        )
                      )
                    }
                  />
                ) : (
                  item.age
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.city}
                    onChange={(e) =>
                      setTableData(
                        tableData.map((d) =>
                          d.id === item.id ? { ...d, city: e.target.value } : d
                        )
                      )
                    }
                  />
                ) : (
                  item.city
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input
                    type="text"
                    maxLength={10}
                    value={item.phone}
                    onChange={(e) =>
                      setTableData(
                        tableData.map((d) =>
                          d.id === item.id ? { ...d, phone: e.target.value } : d
                        )
                      )
                    }
                  />
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
      </table> */}
      <MembersTable
        membersData={tableData}
        editingId={editingId}
        handechange={handleTableChange}
        onedit={handleEdit}
        onsave={handleSave}
      />
    </div>
  );
};

export default TableSearch;
