// TaskEdit.jsx
import React, { useState } from "react";

const TaskEdit = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (field, value) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-4 rounded-lg space-y-4 border border-gray-200">
      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
        <h2 className="text-lg font-bold text-[#101010]">Edit Task</h2>
        <div className="flex gap-2">
          <button className="bg-gray-200 px-3 py-1 rounded" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="bg-[#E5484D] text-white px-3 py-1 rounded"
            onClick={() => onSave(editedTask)}
          >
            Save
          </button>
        </div>
      </div>

      {/* Code & Label */}
      <div className="flex gap-4">
        <input
          type="text"
          value={editedTask.code}
          onChange={(e) => handleChange("code", e.target.value)}
          placeholder="Code"
          className="p-2 rounded border w-1/2"
        />
        <input
          type="text"
          value={editedTask.label}
          onChange={(e) => handleChange("label", e.target.value)}
          placeholder="Label"
          className="p-2 rounded border w-1/2"
        />
      </div>

      {/* Name & Description */}
      <input
        type="text"
        value={editedTask.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Task Name"
        className="w-full p-2 border rounded"
      />
      <textarea
        value={editedTask.description}
        onChange={(e) => handleChange("description", e.target.value)}
        placeholder="Task Description"
        className="w-full p-2 border rounded"
      />

      {/* Status and State */}
      <div className="grid grid-cols-2 gap-4">
        <input
          value={editedTask.status}
          onChange={(e) => handleChange("status", e.target.value)}
          placeholder="Status"
          className="w-full p-2 border rounded"
        />
        <input
          value={editedTask.state}
          onChange={(e) => handleChange("state", e.target.value)}
          placeholder="State"
          className="w-full p-2 border rounded"
        />
        <input
          value={editedTask.project}
          onChange={(e) => handleChange("project", e.target.value)}
          placeholder="Project"
          className="w-full p-2 border rounded"
        />
        <input
          value={editedTask.phase}
          onChange={(e) => handleChange("phase", e.target.value)}
          placeholder="Phase"
          className="w-full p-2 border rounded"
        />
        <input
          value={editedTask.area}
          onChange={(e) => handleChange("area", e.target.value)}
          placeholder="Project Area"
          className="col-span-2 w-full p-2 border rounded"
        />
      </div>

      {/* Dates */}
      {["Planned", "Forecast", "Actual"].map((type) => (
        <div key={type}>
          <h3 className="text-sm font-semibold text-[#101010] mb-1">{type} Dates</h3>
          <div className="grid grid-cols-2 gap-4">
            {["Start", "Finish"].map((label) => {
              const field = `${type.toLowerCase()}${label}`;
              return (
                <input
                  key={field}
                  type="text"
                  value={editedTask[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  placeholder={`${type} ${label}`}
                  className="w-full p-2 border rounded"
                />
              );
            })}
          </div>
        </div>
      ))}

      {/* Others */}
      <input
        value={editedTask.outcome}
        onChange={(e) => handleChange("outcome", e.target.value)}
        placeholder="Outcome"
        className="w-full p-2 border rounded"
      />
      <input
        value={editedTask.outcomeDescription}
        onChange={(e) => handleChange("outcomeDescription", e.target.value)}
        placeholder="Outcome Description"
        className="w-full p-2 border rounded"
      />
      <input
        value={editedTask.responsible}
        onChange={(e) => handleChange("responsible", e.target.value)}
        placeholder="Responsible"
        className="w-full p-2 border rounded"
      />
      <input
        value={editedTask.precedentTask}
        onChange={(e) => handleChange("precedentTask", e.target.value)}
        placeholder="Precedent Task"
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default TaskEdit;
