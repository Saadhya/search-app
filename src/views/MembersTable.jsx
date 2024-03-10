import React from "react";

const header = [
  "plot number",
  "name",
  "email",
  "mobile_number",
  "vehicle number",
];
const MembersTable = ({
  membersData,
  handechange,
  onsave,
  onedit,
  editingId,
}) => {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        {/* <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Employees</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all employees. You can add new employees, edit or delete existing
              ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new employee
            </button>
          </div>
        </div> */}
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 capitalize">
                    <tr>
                      {header.map((head) => (
                        <th
                        key={head}
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>{head}</span>
                        </th>
                      ))}

                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {membersData.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900 ">
                            {item.plot_number}
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-4">
                          <div className="flex items-center">
                            <div className="ml-4">
                              {editingId === item.id ? (
                                <input
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                  type="text"
                                  value={item.name}
                                  name="name"
                                  onChange={(e) => handechange(e, item.id)}
                                />
                              ) : (
                                <div className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          {editingId === item.id ? (
                            <input
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="email"
                                value={item.email}
                                name="email"
                                onChange={(e) => handechange(e,item.id)}
                            />
                          ) : (
                            <div className="text-sm text-gray-900 ">
                              {item.email}
                            </div>
                          )}
                        </td>

                        <td className="whitespace-nowrap py-4 text-sm text-gray-700">
                          {editingId === item.id ? (
                            <input
                              type="text"
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              value={item.mobile_number}
                              name="mobile_number"
                              onChange={(e) => handechange(e,item.id)}
                            />
                          ) : (
                            item.mobile_number
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                            {editingId === item.id ? (
                                <input
                                type="text"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                value={item.vehicle_number}
                                name="vehicle_number"
                                onChange={(e) => handechange(e,item.id)}
                                />
                            ) : (
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                    {item.vehicle_number}
                                </span>
                            )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                          {editingId === item.id ? (
                            <button onClick={() => onsave(item.id, item)}>
                              Update
                            </button>
                          ) : (
                            <button onClick={() => onedit(item.id)}>
                              Edit
                            </button>
                          )}
                          {/* <a href="#" className="text-gray-700">
                            Edit
                          </a> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MembersTable;
