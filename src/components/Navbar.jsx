import { useState, useEffect } from "react"
import { Plus, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
 
// Icons
import filterIcon from '@assets/icons/filtericon.svg'
import calicon from '@assets/icons/calicon.svg'
import responsibleicon from '@assets/icons/responsibleicon.svg'
import statusIcon from '@assets/icons/statusicon.svg'
import camIcon from '@assets/icons/camicon.svg'
import updown from '@assets/icons/updown.svg'
import share from '@assets/icons/share.svg'
import dropdownIcon from '@assets/icons/dropdownicon.svg'
import Dropdown from "./Dropdown"
 
const Navbar = () => {
    const location = useLocation()
    const currentPath = location.pathname
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const [responsible, setResponsible] = useState(false)
    const [period, setPeriod] = useState(false)
    const [outCome, setOutCome] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
   
    // State for areas and phases
    const [areas, setAreas] = useState([])
    const [phases, setPhases] = useState([])
    const [loadingData, setLoadingData] = useState(false)
   
    // State for task details
    const [taskDetails, setTaskDetails] = useState({
        name: '',
        description: '',
        planned_start: '',
        planned_finish: '',
        fore_act_start: '',
        fore_act_finish: '',
        pct_weight: 0,
        pct_complete: 0,
        optional_flag: false,
        state: 'planned',
        status: 'not_started',
        area_id: '',
        phase_id: ''
    })
 
    // Fetch areas and phases when panel opens
    useEffect(() => {
        if (isPanelOpen) {
            fetchDropdownData()
        }
    }, [isPanelOpen])
 
    const fetchDropdownData = async () => {
        setLoadingData(true)
        try {
            const templateId = "3840a3bb-3689-490b-813a-35903a8d3912"
           
            // Fetch areas
            const areasResponse = await axios.get(
                `https://framsysnode-app-530349298365.asia-south2.run.app/api/roadmap-templates/${templateId}/areas`
            )
            setAreas(areasResponse.data)
           
            // Fetch phases
            const phasesResponse = await axios.get(
                `https://framsysnode-app-530349298365.asia-south2.run.app/api/roadmap-templates/${templateId}/phases`
            )
            setPhases(phasesResponse.data)
           
        } catch (err) {
            console.error('Error fetching dropdown data:', err)
            setError('Failed to load dropdown options')
        } finally {
            setLoadingData(false)
        }
    }
 
    const handleCheckboxClick = (e, setter) => {
        e.preventDefault()
        e.stopPropagation()
        setter((prev) => !prev)
    }
 
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setTaskDetails(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }
 
    // Special handler for area selection
    const handleAreaChange = (e) => {
        const selectedAreaId = e.target.value
        setTaskDetails(prev => ({
            ...prev,
            area_id: selectedAreaId
        }))
    }
 
    // Special handler for phase selection
    const handlePhaseChange = (e) => {
        const selectedPhaseId = e.target.value
        setTaskDetails(prev => ({
            ...prev,
            phase_id: selectedPhaseId
        }))
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
       
        try {
            const templateId = "3840a3bb-3689-490b-813a-35903a8d3912"
           
            // Prepare the data for submission
            const submissionData = {
                ...taskDetails,
                pct_weight: Number(taskDetails.pct_weight),
                pct_complete: Number(taskDetails.pct_complete),
                planned_start: taskDetails.planned_start || null,
                planned_finish: taskDetails.planned_finish || null,
                fore_act_start: taskDetails.fore_act_start || null,
                fore_act_finish: taskDetails.fore_act_finish || null,
                area_id: taskDetails.area_id || null,
                phase_id: taskDetails.phase_id || null
            }
 
            console.log('Submitting task with:', submissionData)
 
            const response = await axios.post(
                `https://framsysnode-app-530349298365.asia-south2.run.app/api/roadmap-templates/${templateId}/tasks`,
                submissionData
            )
           
            console.log('Task created successfully:', response.data)
            setIsPanelOpen(false)
            setTaskDetails({
                name: '',
                description: '',
                planned_start: '',
                planned_finish: '',
                fore_act_start: '',
                fore_act_finish: '',
                pct_weight: 0,
                pct_complete: 0,
                optional_flag: false,
                state: 'planned',
                status: 'not_started',
                area_id: '',
                phase_id: ''
            })
           
        } catch (err) {
            console.error('Error creating task:', err)
            setError(err.response?.data?.message || 'Failed to create task')
        } finally {
            setIsLoading(false)
        }
    }
 
    return (
        <>
            <div className="flex gap-2 px-1 justify-between mb-2">
                <div className="flex items-center gap-2 h-8">
                    <div className="border-2 rounded-full h-full border-[#CDCED6] flex items-center overflow-hidden max-w-max">
                        <Link to="/" className={`w-[80px] ${currentPath === '/' ? 'bg-[#BA5542] text-white' : ''} h-[32px] flex justify-center items-center px-2 text-[14px] font-medium`}>Roadmap</Link>
                        <Link to="/kanban" className={`w-[68px] h-[32px] ${currentPath === '/kanban' ? 'bg-[#BA5542] text-white' : ''}  flex justify-center items-center  text-[14px] font-medium`}>Kanban</Link>
                        <Link to="/gantt" className={`w-[54px] h-[32px] flex ${currentPath === '/gantt' ? 'bg-[#BA5542] text-white' : ''} justify-center items-center text-[14px] font-medium`}>Gantt</Link>
                    </div>
                    <div className="h-full">
                        <button
                            onClick={() => setIsPanelOpen(true)}
                            className="w-[72px] h-full px-2 flex gap-2 text-sm items-center bg-[#F0F0F3] rounded-[6px] text-[#60646C] font-medium">
                            <Plus size={currentPath === '/' ? 21 : 35} color="#60646C" strokeWidth={3} />
                            <span className="text-[#1C2024] text-sm font-medium">
                                {currentPath === '/' ? 'Task' : 'Activity'}
                            </span>
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <button><img src={filterIcon} alt="" /></button>
                        <button className="border-2 gap-1 h-[25px] rounded-[50px] px-2 py-1 border-[#E0E1E6] flex items-center text-sm"><img src={calicon} alt="" />Due</button>
                        <button className="border-2 gap-1 h-[25px] rounded-[50px] px-2 py-1 border-[#E0E1E6] flex items-center text-sm"><img src={responsibleicon} alt="" /> Responsible</button>
                        <button className="border-2 gap-1 h-[25px] rounded-[50px] px-2 py-1 border-[#E0E1E6] flex items-center text-sm"><img src={statusIcon} alt="" /> Status</button>
                    </div>
                    <div className="flex items-center gap-2 h-8">
                        <button className="h-full"><img src={camIcon} alt="" /></button>
                        <button className="h-full"><img src={updown} alt="" /></button>
                        {currentPath === '/' && <button className="text-[#101010] font-medium text-sm bg-[#F0F0F3] h-full px-3 rounded-[6px]">All Phases</button>}
                        <Dropdown className="h-full" />
                        <button className="size-8 h-full flex-1"><img src={share} alt="" /></button>
                    </div>
                </div>
            </div>
 
            {/* Task Creation Side Panel */}
            {isPanelOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={() => !isLoading && setIsPanelOpen(false)}
                    ></div>
                   
                    <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
                        <div className="relative w-screen max-w-md">
                            <div className="h-full flex flex-col bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto">
                                    <div className="px-4 py-6 bg-[#BA5542] text-white">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-medium">Create New Task</h2>
                                            <button
                                                onClick={() => !isLoading && setIsPanelOpen(false)}
                                                className="text-white hover:text-gray-200"
                                                disabled={isLoading}
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>
                                    </div>
                                   
                                    <div className="px-4 py-6">
                                        {error && (
                                            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                                                {error}
                                            </div>
                                        )}
                                       
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Task Name*
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={taskDetails.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BA5542] focus:border-[#BA5542]"
                                                    required
                                                />
                                            </div>
                                           
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    name="description"
                                                    value={taskDetails.description}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BA5542] focus:border-[#BA5542]"
                                                />
                                            </div>
 
                                            {/* Area and Phase Dropdowns */}
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Area*
                                                    </label>
                                                    <select
                                                        name="area_id"
                                                        value={taskDetails.area_id}
                                                        onChange={handleAreaChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BA5542] focus:border-[#BA5542]"
                                                        required
                                                        disabled={loadingData}
                                                    >
                                                        <option value="">Select Area</option>
                                                        {areas.map(area => (
                                                            <option key={area.cuid} value={area.cuid}>
                                                                {area.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Phase*
                                                    </label>
                                                    <select
                                                        name="phase_id"
                                                        value={taskDetails.phase_id}
                                                        onChange={handlePhaseChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BA5542] focus:border-[#BA5542]"
                                                        required
                                                        disabled={loadingData}
                                                    >
                                                        <option value="">Select Phase</option>
                                                        {phases.map(phase => (
                                                            <option key={phase.cuid} value={phase.cuid}>
                                                                {phase.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                           
                                            {/* Rest of your form fields remain the same */}
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Planned Start Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="planned_start"
                                                        value={taskDetails.planned_start}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BA5542] focus:border-[#BA5542]"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Planned Finish Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="planned_finish"
                                                        value={taskDetails.planned_finish}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#BA5542] focus:border-[#BA5542]"
                                                    />
                                                </div>
                                            </div>
                                           
                                            {/* ... (other form fields remain unchanged) ... */}
                                           
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsPanelOpen(false)}
                                                    className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                    disabled={isLoading}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#BA5542] hover:bg-[#9a4737] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BA5542] disabled:opacity-50"
                                                    disabled={isLoading || loadingData}
                                                >
                                                    {isLoading ? 'Saving...' : 'Save Task'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
 
export default Navbar