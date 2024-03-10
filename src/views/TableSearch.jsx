import React, { useEffect, useMemo, useState } from "react";
import MembersTable from "./MembersTable";
import { createClient } from "@supabase/supabase-js";

const TableSearch = () => {
  const [initialData, setInitialData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Create a single supabase client for interacting with your database
  const supabase = useMemo(
    () =>
      createClient(
        process.env.REACT_APP_SUPBASE_URL,
        process.env.REACT_APP_SUPBASE_KEY
      ),
    [] // Empty dependency array ensures that it's created only once
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
  }, [supabase]);

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
      const { data: updatedData, error } = await supabase
        .from("members-gws")
        .update(req)
        .eq("id", id);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("update success " + updatedData);
        // setTableData(updatedData);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setEditingId(null);
  };
  const handleTableChange = (e, id) => {
    const { name, value } = e.target;
    const updatedData = tableData.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );

    setTableData(updatedData);
    // console.log(updatedData);

    // setData((prevData) =>
    //   prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    // );
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
