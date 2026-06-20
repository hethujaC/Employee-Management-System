import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

const API_URL = import.meta.env.VITE_API_URL || "/api/employees";

const emptyForm = {
  name: "",
  designation: "",
  salary: "",
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const formTitle = useMemo(
    () => (editingEmployee ? "Edit Employee" : "Add Employee"),
    [editingEmployee]
  );

  useEffect(() => {
    let isMounted = true;

    const loadEmployees = async () => {
      try {
        const response = await axios.get(API_URL);

        if (isMounted) {
          setEmployees(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || "Unable to load employees.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadEmployees();

    return () => {
      isMounted = false;
    };
  }, []);

  const openAddForm = () => {
    setEditingEmployee(null);
    setForm(emptyForm);
    setError("");
    setIsFormOpen(true);
  };

  const openEditForm = (employee) => {
    setEditingEmployee(employee);
    setForm({
      name: employee.name,
      designation: employee.designation,
      salary: employee.salary,
    });
    setError("");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingEmployee(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");

      const payload = {
        name: form.name.trim(),
        designation: form.designation.trim(),
        salary: Number(form.salary),
      };

      if (editingEmployee) {
        const response = await axios.put(`${API_URL}/${editingEmployee.id}`, payload);
        setEmployees((current) =>
          current.map((employee) =>
            employee.id === editingEmployee.id ? response.data : employee
          )
        );
      } else {
        const response = await axios.post(API_URL, payload);
        setEmployees((current) => [...current, response.data]);
      }

      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save employee.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (employee) => {
    const shouldDelete = window.confirm(
      `Delete ${employee.name} from the employee list?`
    );

    if (!shouldDelete) return;

    try {
      setError("");
      await axios.delete(`${API_URL}/${employee.id}`);
      setEmployees((current) =>
        current.filter((item) => item.id !== employee.id)
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete employee.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
              Employee Management System
            </h1>
          </div>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-500 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            type="button"
            onClick={openAddForm}
          >
            + Add Employee
          </button>
        </section>

        {error && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {error}
          </div>
        )}

        <EmployeeTable
          employees={employees}
          isLoading={isLoading}
          onEdit={openEditForm}
          onDelete={handleDelete}
        />
      </div>

      {isFormOpen && (
        <EmployeeForm
          form={form}
          title={formTitle}
          isEditing={Boolean(editingEmployee)}
          isSaving={isSaving}
          employeeNo={editingEmployee?.id}
          onChange={setForm}
          onClose={closeForm}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}

export default App;
