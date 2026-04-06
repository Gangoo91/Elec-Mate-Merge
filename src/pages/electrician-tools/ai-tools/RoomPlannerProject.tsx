import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MoreVertical,
  Plus,
  Camera,
  Trash2,
  Edit3,
  FileText,
  ChevronDown,
  ChevronUp,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import {
  useFloorPlanProject,
  ROOM_TYPE_LABELS,
  type RoomType,
  type FloorPlanProject,
} from '@/hooks/useFloorPlanProject';

// ─── Animation variants ─────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

// ─── Component ───────────────────────────────────────────────────────────────────

const RoomPlannerProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const haptic = useHaptic();

  const {
    projects,
    currentProject,
    createProject,
    updateProject,
    deleteProject,
    addRoom,
    deleteRoom,
  } = useFloorPlanProject(projectId);

  // ── Local state ──
  const [addRoomOpen, setAddRoomOpen] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteRoomId, setDeleteRoomId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Add room form
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomType, setNewRoomType] = useState<RoomType>('kitchen');
  const [newRoomWidth, setNewRoomWidth] = useState('');
  const [newRoomHeight, setNewRoomHeight] = useState('');

  // Create/edit project form
  const [formName, setFormName] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formClient, setFormClient] = useState('');

  // ── Handlers ──

  const handleCreateProject = useCallback(() => {
    if (!formName.trim()) {
      toast({ title: 'Project name required', variant: 'destructive' });
      return;
    }
    haptic.success();
    const project = createProject(formName.trim(), formAddress.trim(), formClient.trim());
    setCreateProjectOpen(false);
    setFormName('');
    setFormAddress('');
    setFormClient('');
    navigate(`/electrician/business/room-planner/projects/${project.id}`);
    toast({ title: 'Project created', variant: 'success' });
  }, [formName, formAddress, formClient, createProject, navigate, haptic]);

  const handleEditProject = useCallback(() => {
    if (!projectId || !formName.trim()) return;
    haptic.light();
    updateProject(projectId, {
      name: formName.trim(),
      address: formAddress.trim(),
      clientName: formClient.trim(),
    });
    setEditProjectOpen(false);
    toast({ title: 'Project updated', variant: 'success' });
  }, [projectId, formName, formAddress, formClient, updateProject, haptic]);

  const handleDeleteProject = useCallback(() => {
    if (!projectId) return;
    haptic.warning();
    deleteProject(projectId);
    setDeleteDialogOpen(false);
    navigate('/electrician/business/room-planner/projects');
    toast({ title: 'Project deleted', variant: 'default' });
  }, [projectId, deleteProject, navigate, haptic]);

  const handleAddRoom = useCallback(() => {
    if (!projectId || !newRoomName.trim()) {
      toast({ title: 'Room name required', variant: 'destructive' });
      return;
    }
    haptic.success();
    const dimensions =
      newRoomWidth && newRoomHeight
        ? { width: parseFloat(newRoomWidth), height: parseFloat(newRoomHeight) }
        : undefined;
    const room = addRoom(projectId, newRoomName.trim(), newRoomType, dimensions);
    setAddRoomOpen(false);
    setNewRoomName('');
    setNewRoomType('kitchen');
    setNewRoomWidth('');
    setNewRoomHeight('');
    navigate(`/electrician/business/room-planner/projects/${projectId}/room/${room.id}`);
  }, [projectId, newRoomName, newRoomType, newRoomWidth, newRoomHeight, addRoom, navigate, haptic]);

  const handleDeleteRoom = useCallback(() => {
    if (!projectId || !deleteRoomId) return;
    haptic.warning();
    deleteRoom(projectId, deleteRoomId);
    setDeleteRoomId(null);
    toast({ title: 'Room deleted', variant: 'default' });
  }, [projectId, deleteRoomId, deleteRoom, haptic]);

  const openEditDialog = useCallback(() => {
    if (!currentProject) return;
    setFormName(currentProject.name);
    setFormAddress(currentProject.address);
    setFormClient(currentProject.clientName);
    setEditProjectOpen(true);
  }, [currentProject]);

  // ── No project selected: show project list / create prompt ──

  if (!projectId) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 h-14 bg-background border-b border-white/10">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 text-white hover:text-white hover:bg-white/10 touch-manipulation"
              onClick={() => navigate('/electrician/business')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-semibold text-white">Room Planner</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-20 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Home className="h-8 w-8 text-white" />
              </div>
              <div className="text-center space-y-1">
                <h2 className="text-lg font-semibold text-white">No projects yet</h2>
                <p className="text-sm text-white">
                  Create a project to start planning room-by-room electrical layouts.
                </p>
              </div>
              <Button
                className="h-11 px-6 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation"
                onClick={() => setCreateProjectOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          ) : (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                {projects.map((project) => (
                  <motion.button
                    key={project.id}
                    variants={itemVariants}
                    className="w-full card-surface-interactive p-4 text-left touch-manipulation active:scale-[0.98] transition-transform"
                    onClick={() => {
                      haptic.light();
                      navigate(`/electrician/business/room-planner/projects/${project.id}`);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 min-w-0 flex-1">
                        <h3 className="text-base font-semibold text-white truncate">
                          {project.name}
                        </h3>
                        {project.address && (
                          <p className="text-sm text-white truncate">{project.address}</p>
                        )}
                        <p className="text-sm text-white">
                          {project.rooms.length} {project.rooms.length === 1 ? 'room' : 'rooms'}
                        </p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-white shrink-0 mt-1 rotate-[-90deg]" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
              <Button
                className="w-full h-11 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation"
                onClick={() => setCreateProjectOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </>
          )}
        </div>

        {/* Create project sheet */}
        <ProjectFormSheet
          open={createProjectOpen}
          onOpenChange={setCreateProjectOpen}
          title="New Project"
          buttonLabel="Create Project"
          name={formName}
          address={formAddress}
          clientName={formClient}
          onNameChange={setFormName}
          onAddressChange={setFormAddress}
          onClientChange={setFormClient}
          onSubmit={handleCreateProject}
        />
      </div>
    );
  }

  // ── Project not found ──

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-white text-base">Project not found</p>
          <Button
            variant="ghost"
            className="h-11 text-white touch-manipulation"
            onClick={() => navigate('/electrician/business/room-planner/projects')}
          >
            Back to projects
          </Button>
        </div>
      </div>
    );
  }

  // ── Project detail view ──

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 h-14 bg-background border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 text-white hover:text-white hover:bg-white/10 touch-manipulation shrink-0"
            onClick={() => navigate('/electrician/business/room-planner/projects')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-base font-semibold text-white truncate">{currentProject.name}</h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 text-white hover:text-white hover:bg-white/10 touch-manipulation shrink-0"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-elec-card border-white/10 min-w-[180px]">
            <DropdownMenuItem
              className="text-white hover:bg-white/10 touch-manipulation"
              onClick={openEditDialog}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              className="text-red-400 hover:bg-white/10 touch-manipulation"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="p-4 space-y-4">
        {/* Collapsible property details */}
        <button
          className="w-full card-surface-interactive p-4 text-left touch-manipulation active:scale-[0.98] transition-transform"
          onClick={() => {
            haptic.light();
            setDetailsOpen((o) => !o);
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Property Details</span>
            {detailsOpen ? (
              <ChevronUp className="h-4 w-4 text-white" />
            ) : (
              <ChevronDown className="h-4 w-4 text-white" />
            )}
          </div>
          {detailsOpen && (
            <div className="mt-3 space-y-1.5">
              {currentProject.address && (
                <p className="text-sm text-white">
                  <span className="font-medium">Address:</span> {currentProject.address}
                </p>
              )}
              {currentProject.clientName && (
                <p className="text-sm text-white">
                  <span className="font-medium">Client:</span> {currentProject.clientName}
                </p>
              )}
              {!currentProject.address && !currentProject.clientName && (
                <p className="text-sm text-white">No details added yet.</p>
              )}
            </div>
          )}
        </button>

        {/* Room cards grid */}
        {currentProject.rooms.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-3"
          >
            {currentProject.rooms.map((room) => (
              <motion.div key={room.id} variants={itemVariants}>
                <button
                  className="w-full card-surface-interactive overflow-hidden text-left touch-manipulation active:scale-[0.98] transition-transform"
                  onClick={() => {
                    haptic.light();
                    navigate(
                      `/electrician/business/room-planner/projects/${projectId}/room/${room.id}`
                    );
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    haptic.warning();
                    setDeleteRoomId(room.id);
                  }}
                >
                  {/* Photo area */}
                  <div className="relative w-full aspect-[4/3] bg-white/5 flex items-center justify-center">
                    {room.photoBase64 ? (
                      <img
                        src={room.photoBase64}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="h-8 w-8 text-white" />
                    )}
                  </div>

                  {/* Room info */}
                  <div className="p-3 space-y-0.5">
                    <p className="text-sm font-semibold text-white truncate">{room.name}</p>
                    {room.dimensions && (
                      <p className="text-xs text-white">
                        {room.dimensions.width} x {room.dimensions.height}m
                      </p>
                    )}
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Add room button */}
        <Button
          variant="outline"
          className="w-full h-11 border-dashed border-white/20 text-white hover:text-white hover:bg-white/5 touch-manipulation"
          onClick={() => {
            haptic.light();
            setAddRoomOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Room
        </Button>

        {/* Export PDF button */}
        {currentProject.rooms.length > 0 && (
          <Button
            className="w-full h-11 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation"
            onClick={() => {
              haptic.light();
              toast({
                title: 'Coming soon',
                description: 'Full PDF export will be available in a future update.',
              });
            }}
          >
            <FileText className="h-4 w-4 mr-2" />
            Export Full PDF
          </Button>
        )}
      </div>

      {/* ── Add Room Sheet ── */}
      <Sheet open={addRoomOpen} onOpenChange={setAddRoomOpen}>
        <SheetContent side="bottom" className="h-[50vh] rounded-t-2xl overflow-auto">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle className="text-white text-lg">Add Room</SheetTitle>
          </SheetHeader>
          <div className="p-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white">Room Name</label>
              <Input
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="e.g. Kitchen"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white">Room Type</label>
              <Select value={newRoomType} onValueChange={(v) => setNewRoomType(v as RoomType)}>
                <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">
                  {(Object.entries(ROOM_TYPE_LABELS) as [RoomType, string][]).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white">Width (m)</label>
                <Input
                  value={newRoomWidth}
                  onChange={(e) => setNewRoomWidth(e.target.value)}
                  placeholder="e.g. 4"
                  type="number"
                  inputMode="decimal"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white">Height (m)</label>
                <Input
                  value={newRoomHeight}
                  onChange={(e) => setNewRoomHeight(e.target.value)}
                  placeholder="e.g. 3"
                  type="number"
                  inputMode="decimal"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>
            <Button
              className="w-full h-11 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation"
              onClick={handleAddRoom}
            >
              Add Room
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Edit Project Sheet ── */}
      <ProjectFormSheet
        open={editProjectOpen}
        onOpenChange={setEditProjectOpen}
        title="Edit Project"
        buttonLabel="Save Changes"
        name={formName}
        address={formAddress}
        clientName={formClient}
        onNameChange={setFormName}
        onAddressChange={setFormAddress}
        onClientChange={setFormClient}
        onSubmit={handleEditProject}
      />

      {/* ── Create Project Sheet (from list view — needed for consistency) ── */}
      <ProjectFormSheet
        open={createProjectOpen}
        onOpenChange={setCreateProjectOpen}
        title="New Project"
        buttonLabel="Create Project"
        name={formName}
        address={formAddress}
        clientName={formClient}
        onNameChange={setFormName}
        onAddressChange={setFormAddress}
        onClientChange={setFormClient}
        onSubmit={handleCreateProject}
      />

      {/* ── Delete Project Dialog ── */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-background border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will permanently delete the project and all its rooms. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 bg-red-600 hover:bg-red-700 touch-manipulation"
              onClick={handleDeleteProject}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Delete Room Dialog ── */}
      <AlertDialog open={!!deleteRoomId} onOpenChange={(open) => !open && setDeleteRoomId(null)}>
        <AlertDialogContent className="bg-background border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Room</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will permanently delete this room and its diagram. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 bg-red-600 hover:bg-red-700 touch-manipulation"
              onClick={handleDeleteRoom}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// ─── Reusable project form sheet ─────────────────────────────────────────────────

interface ProjectFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  buttonLabel: string;
  name: string;
  address: string;
  clientName: string;
  onNameChange: (v: string) => void;
  onAddressChange: (v: string) => void;
  onClientChange: (v: string) => void;
  onSubmit: () => void;
}

function ProjectFormSheet({
  open,
  onOpenChange,
  title,
  buttonLabel,
  name,
  address,
  clientName,
  onNameChange,
  onAddressChange,
  onClientChange,
  onSubmit,
}: ProjectFormSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[50vh] rounded-t-2xl overflow-auto">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle className="text-white text-lg">{title}</SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Project Name</label>
            <Input
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. 14 High Street Rewire"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Address</label>
            <Input
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              placeholder="e.g. 14 High Street, London"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-white">Client Name</label>
            <Input
              value={clientName}
              onChange={(e) => onClientChange(e.target.value)}
              placeholder="e.g. J. Smith"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          <Button
            className="w-full h-11 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation"
            onClick={onSubmit}
          >
            {buttonLabel}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default RoomPlannerProject;
