import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskDetails = ({ task, onTaskUpdated, onTaskDeleted, onClose }) => {
  const API_URL =
    "https://framsysnode-app-530349298365.asia-south2.run.app/api/";

  const initialData = {
    name: task.name,
    description:
      task.description ||
      "Developing a master project schedule involves organising and structuring all aspects of the project into a cohesive timeline...",
    status: task.status || "In Progress",
    state: task.state || "Behind Schedule",
    project: task.project || "Field Development Project",
    phase: task.phase_id || "Define",
    area: task.area_id || "Operations Management",
    plannedStart: task.planned_start || "1 January 2024",
    plannedFinish: task.planned_finish || "19 October 2025",
    forecastStart: task.fore_act_start || "1 January 2024",
    forecastFinish: task.fore_act_finish || "19 October 2025",
    actualStart: task.actual_start || "1 January 2024",
    actualFinish: task.actual_finish || "19 October 2025",
    outcome: task.outcome || "Sample Outcome Name",
    outcomeDescription:
      task.outcomeDescription ||
      "Framsys methodology is designed to streamline project delivery...",
    responsible: task.responsible || "John Doe the Second",
    precedentTask: task.precedentTask || "Sample Task Name 1",
  };

  const [taskData, setTaskData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTaskData(initialData);
  }, [task]);

  const handleChange = (field) => (e) => {
    setTaskData({ ...taskData, [field]: e.target.value });
  };

  const handleCancel = () => {
    setTaskData(initialData);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${API_URL}tasks/${task.cuid}`);

        if (typeof onTaskDeleted === "function") {
          onTaskDeleted(task.cuid);
        }

        if (typeof onClose === "function") {
          onClose();
        }

        alert("✅ Task deleted successfully.");
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("❌ Failed to delete task. Please try again.");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        ...taskData,
        area_id: taskData.area,
        phase_id: taskData.phase,
      };

      const response = await axios.put(`${API_URL}tasks/${task.cuid}`, payload);

      if (typeof onTaskUpdated === "function") {
        onTaskUpdated(response.data);
      }

      setIsEditing(false);
      alert("✅ Task updated successfully.");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("❌ Failed to update task. Please check your input and try again.");
    }
  };

  const renderField = (field, isTextarea = false) => {
    if (isEditing) {
      return isTextarea ? (
        <textarea
          className="w-full p-2 rounded border"
          rows="3"
          value={taskData[field]}
          onChange={handleChange(field)}
        />
      ) : (
        <input
          className="w-full p-2 rounded border"
          value={taskData[field]}
          onChange={handleChange(field)}
        />
      );
    } else {
      return (
        <div className="p-2 rounded bg-white border">{taskData[field]}</div>
      );
    }
  };

  return (
    <div className="bg-[#F1F2F4] p-4 rounded-lg">
      <div className="flex justify-between mb-4 items-center gap-2 flex-wrap">
        <div className="flex border-b border-gray-200">
          <button className="pb-2 px-4 font-semibold text-[#101010] border-b-2 border-[#101010]">
            Details
          </button>
          <button className="pb-2 px-4 font-semibold text-[#60646C]">
            Activity
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="bg-[#E5484D] text-white px-4 py-2 rounded hover:bg-[#D43D42]"
          >
            Delete Task
          </button>
          {!isEditing && (
            <button
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-s font-medium text-[#101010]">[A-1]</span>
        <span className="text-s text-[#60646C]">[Label]</span>
      </div>

      <div className="mb-3">
        <label className="text-s font-semibold text-[#60646C] mb-1 block">
          Task name
        </label>
        {renderField("name")}
      </div>

      <div className="mb-4">
        <label className="text-s font-semibold text-[#60646C] mb-1 block">
          Task description
        </label>
        {renderField("description", true)}
      </div>

      <div className="flex flex-col gap-y-2 bg-[#F2F3F4] p-4 rounded-md mb-4">
        {["status", "state", "project", "phase", "area"].map((field) => (
          <div
            key={field}
            className="grid grid-cols-[160px_1fr] items-center gap-x-5"
          >
            <label className="text-s font-semibold text-[#60646C] tracking-wider capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-4">
        {["Planned", "Forecast", "Actual"].map((label) => (
          <div key={label}>
            <h3 className="text-s font-semibold text-[#101010] mb-1">
              {label} Dates
            </h3>
            <div className="grid grid-cols-2 gap-1">
              {["Start", "Finish"].map((time) => {
                const field = `${label.toLowerCase()}${time}`;
                return (
                  <div
                    key={field}
                    className="grid grid-cols-2 items-center gap-1"
                  >
                    <label className="text-s font-semibold text-[#60646C] pl-1">
                      {time}
                    </label>
                    {renderField(field)}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {[
        "outcome",
        "outcomeDescription",
        "responsible",
        "precedentTask",
      ].map((field) => (
        <div key={field} className="grid grid-cols-[180px_1fr] gap-4 mb-2">
          <label className="text-s font-semibold text-[#60646C] tracking-wider pl-1">
            {field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </label>
          {renderField(field, field === "outcomeDescription")}
        </div>
      ))}

      {isEditing && (
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="bg-gray-300 text-black font-medium py-2 px-4 rounded hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleUpdate}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
