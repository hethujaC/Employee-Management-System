function EmployeeTable({ employees, isLoading, onEdit, onDelete }) {
  const formatSalary = (salary) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
    }).format(Number(salary));

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-1 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Employee List</h2>
          <p className="text-sm text-slate-500">Manage employee records</p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          {employees.length} records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-collapse text-left">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3 font-bold">Employee No</th>
              <th className="px-5 py-3 font-bold">Employee Name</th>
              <th className="px-5 py-3 font-bold">Designation</th>
              <th className="px-5 py-3 font-bold">Salary</th>
              <th className="px-5 py-3 font-bold">Edit</th>
              <th className="px-5 py-3 font-bold">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {isLoading && (
              <tr>
                <td className="px-5 py-10 text-center text-slate-500" colSpan="6">
                  Loading employees...
                </td>
              </tr>
            )}

            {!isLoading && employees.length === 0 && (
              <tr>
                <td className="px-5 py-10 text-center text-slate-500" colSpan="6">
                  No employees found. Add your first employee to get started.
                </td>
              </tr>
            )}

            {!isLoading &&
              employees.map((employee) => (
                <tr className="transition hover:bg-slate-50" key={employee.id}>
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {employee.id}
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-950">
                    {employee.name}
                  </td>
                  <td className="px-5 py-4">{employee.designation}</td>
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {formatSalary(employee.salary)}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      type="button"
                      onClick={() => onEdit(employee)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100"
                      type="button"
                      onClick={() => onDelete(employee)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default EmployeeTable;
