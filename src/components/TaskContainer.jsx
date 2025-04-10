// TaskContainer.jsx
import React, { useState } from "react";
import TaskDetails from "./TaskDetails";
import TaskEdit from "./TaskEdit";

const TaskContainer = () => {
  const [task, setTask] = useState({
    code: "T001",
    label: "Initial Setup",
    name: "Project Setup",
    description: "Setup project structure and tools",
    status: "Open",
    state: "New",
    project: "Website Revamp",
    phase: "Planning",
    area: "Frontend",
    plannedStart: "2025-04-01",
    plannedFinish: "2025-04-05",
    forecastStart: "2025-04-02",
    forecastFinish: "2025-04-06",
    actualStart: "2025-04-03",
    actualFinish: "",
    outcome: "Project Initialized",
    outcomeDescription: "Tools installed and repo created",
    responsible: "Dev Team",
    precedentTask: "None",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedTask) => {
    setTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      {isEditing ? (
        <TaskEdit task={task} onSave={handleSave} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <TaskDetails task={task} />
          <div className="text-right mt-2">
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskContainer;
