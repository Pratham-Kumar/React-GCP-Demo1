import { useState } from 'react';
import AccordionCard from "@/components/AccordionCard";
import TaskAccordion from "@/components/TaskAccordion";
import TaskDetails from "@/components/TaskDetails";
import {
  Accordion, AccordionContent, AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from 'lucide-react'; // Import the chevron icon
import { useRoadmapTemplates, useFullRoadmapData } from '@/hooks/backendHooks';

const Home = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  
  const { templates, loading: templatesLoading } = useRoadmapTemplates();
  const { areas, phases, tasks, loading: templateLoading } = useFullRoadmapData(selectedTemplateId);

  const getTaskCountForPhase = (phaseid) => {
    return tasks.filter(task => task.phase_id === phaseid).length;
  };

  const getTasksByArea = (areaId) => {
    return tasks.filter(task => task.area_id === areaId);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowDetailsPanel(true);
  };

  const handleClosePanel = () => {
    setShowDetailsPanel(false);
  };

  if (templatesLoading) {
    return <div className="flex justify-center items-center h-[87vh]">Loading templates...</div>;
  }

  if (!selectedTemplateId && templates.length > 0) {
    setSelectedTemplateId(templates[0].cuid);
    return <div className="flex justify-center items-center h-[87vh]">Loading roadmap data...</div>;
  }

  return (
    <div className="flex h-[87vh] relative">
      {/* Main Content (always full width unless details panel is open) */}
      <div className={`h-full overflow-y-auto transition-all duration-300 ${
        showDetailsPanel ? 'w-2/3' : 'w-full'
      }`}>
        <Accordion type="multiple" collapsible defaultValue={['phases', ...phases.map(a => a.cuid)]}>
          {/* Phases Section */}
          <TaskAccordion color="#F9F9FB" />
          
          <div className="grid grid-cols-6 gap-2 py-2 min-w-[1440px] overflow-x-auto">
            {phases.map((phase, index) => (
              <PhaseColumn 
                key={phase.cuid}
                phase={phase.name}
                taskCount={getTaskCountForPhase(phase.cuid)}
                isActive={index === 3}
              />
            ))}
          </div>

          {areas.map((area) => (
            <AccordionItem key={area.cuid} value={area.cuid} className="rounded-sm mt-2">
              <AccordionTrigger className="bg-[#F9F9FB] px-2 rounded-sm">
                <div className="text-[16px] font-bold flex items-center gap-2">
                  {area.name}
                  <span className="text-[14px] text-[#60646C] font-semibold">
                    <b className="text-black">{getTasksByArea(area.cuid).length}</b> Tasks
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-6 gap-2 py-4 min-w-[1440px]">
                  {phases.map((phase) => {
                    const phaseTasks = getTasksByArea(area.cuid).filter(
                      task => task.phase_id === phase.cuid
                    );
                    
                    return (
                      <div key={`${area.cuid}-${phase.cuid}`} className="flex flex-col gap-3">
                        {phaseTasks.map((task) => (
                          <AccordionCard 
                            key={task.cuid} 
                            data={{
                              id: task.cuid,
                              title: task.name,
                              description: task.description,
                              status: task.status,
                              assignee: task.assignee,
                              startDate: task.planned_start,
                              endDate: task.planned_finish,
                              progress: task.pct_complete,
                            }}
                            onClick={() => handleTaskClick(task)}
                            isSelected={selectedTask?.cuid === task.cuid}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Task Details Panel */}
{showDetailsPanel && (
  <div className="w-1/3 h-full border-l border-gray-200 bg-white flex flex-col">
    {/* Panel Header with Close Button */}
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <button 
        onClick={handleClosePanel}
        className="p-1 rounded-full hover:bg-gray-100"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
      <div className="flex-1"></div> {/* Spacer */}
    </div>
    
    {/* Panel Content */}
    <div className="flex-1 overflow-y-auto">
      <TaskDetails task={selectedTask} />
    </div>
  </div>
)}
    </div>
  );
};

// Phase Column Component remains the same
const PhaseColumn = ({ phase, taskCount, isActive = false }) => {
  return (
    <div className="min-w-[200px]">
      <div className="flex gap-1 h-7">
        <div className="flex flex-1 gap-2 font-bold items-center justify-center bg-[#F0F0F3] rounded-sm py-1">
          <h4 className={`font-bold ${isActive ? 'text-base' : ''}`} style={{ color: '#101010' }}>
            {phase}
          </h4>
          <span className={`size-6 rounded-full ${isActive ? 'bg-[#E5484D] text-white' : 'bg-[#E8E8EC]'} flex justify-center items-center`}>
            {taskCount}
          </span>
        </div>
        <button className="font-semibold text-[12px] bg-[#E8E8EC] h-full w-4 broder-2 rounded-sm mr-1">G</button>
      </div>
      <div className="grid grid-cols-[16px_auto] gap-1">
        <span></span>
        <small className="text-[#60646C] text-[9px]">
          JANUARY 2025
        </small>
      </div>
    </div>
  );
};

export default Home;