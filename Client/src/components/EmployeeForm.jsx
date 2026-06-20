function EmployeeForm({
  form,
  title,
  isEditing,
  isSaving,
  employeeNo,
  onChange,
  onClose,
  onSubmit,
}) {
  const updateField = (field, value) => {
    onChange({
      ...form,
      [field]: value,
    });
  };

  const inputClass =
    "mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100 disabled:bg-slate-100 disabled:text-slate-500";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 px-4 py-6 sm:items-center" role="presentation">
      <section
        className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl"
        aria-labelledby="employee-form-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase text-emerald-700">
              {isEditing ? "Update record" : "New record"}
            </p>
            <h2 id="employee-form-title" className="mt-1 text-xl font-bold text-slate-950">
              {title}
            </h2>
          </div>
          <button
            aria-label="Close employee form"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-xl font-semibold leading-none text-slate-600 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-200"
            type="button"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <form className="grid gap-4 px-5 py-5" onSubmit={onSubmit}>
          <label className="text-sm font-semibold text-slate-700">
            Employee No
            <input
              className={inputClass}
              disabled
              value={isEditing ? employeeNo : "Auto-generated"}
              readOnly
            />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Employee Name
            <input
              className={inputClass}
              autoFocus
              required
              minLength="2"
              type="text"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="e.g. Rajah"
            />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Designation
            <input
              className={inputClass}
              required
              type="text"
              value={form.designation}
              onChange={(event) =>
                updateField("designation", event.target.value)
              }
              placeholder="e.g. Software Engineer"
            />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Salary
            <input
              className={inputClass}
              required
              min="0.01"
              step="0.01"
              type="number"
              value={form.salary}
              onChange={(event) => updateField("salary", event.target.value)}
              placeholder="e.g. 85000"
            />
          </label>

          <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-100 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-200"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Create Employee"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EmployeeForm;
