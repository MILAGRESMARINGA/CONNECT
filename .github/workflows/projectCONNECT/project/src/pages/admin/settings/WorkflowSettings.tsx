import { useState } from 'react';
import { Workflow, ChevronLeft, GripVertical, Clock, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

interface WorkflowStage {
  id: string;
  name: string;
  timeLimit: number;
  notifications: boolean;
  description: string;
}

const SortableStage = ({ stage }: { stage: WorkflowStage }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: stage.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200 mb-4"
    >
      <div className="flex items-center">
        <div
          {...attributes}
          {...listeners}
          className="cursor-move p-2 hover:bg-neutral-50 rounded"
        >
          <GripVertical className="h-5 w-5 text-neutral-400" />
        </div>
        <div className="flex-1 ml-4">
          <h3 className="text-sm font-medium text-neutral-900">{stage.name}</h3>
          <p className="mt-1 text-sm text-neutral-500">{stage.description}</p>
          <div className="mt-2 flex items-center space-x-4">
            <div className="flex items-center text-sm text-neutral-500">
              <Clock className="h-4 w-4 mr-1" />
              {stage.timeLimit} days
            
            </div>
            <div className="flex items-center text-sm text-neutral-500">
              <Bell className="h-4 w-4 mr-1" />
              {stage.notifications ? 'Notifications enabled' : 'No notifications'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkflowSettings = () => {
  const [stages, setStages] = useState<WorkflowStage[]>([
    {
      id: '1',
      name: 'Initial Contact',
      timeLimit: 1,
      notifications: true,
      description: 'First contact with visitor after registration',
    },
    {
      id: '2',
      name: 'Callback',
      timeLimit: 2,
      notifications: true,
      description: 'Follow-up call to check on visitor',
    },
    {
      id: '3',
      name: 'Visit',
      timeLimit: 7,
      notifications: true,
      description: 'Schedule and complete home visit',
    },
    {
      id: '4',
      name: 'Small Group',
      timeLimit: 14,
      notifications: true,
      description: 'Integration into a small group',
    },
    {
      id: '5',
      name: 'Baptism',
      timeLimit: 30,
      notifications: true,
      description: 'Preparation and completion of baptism',
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setStages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link
              to="/settings"
              className="text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-neutral-900 flex items-center gap-2">
              <Workflow className="h-6 w-6 text-neutral-500" />
              Workflow Settings
            </h1>
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            Configure the faith journey workflow stages and automation
          </p>
        </div>
      </div>

      {/* Workflow Stages */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-medium text-neutral-900">Faith Journey Stages</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Drag and drop to reorder stages. Each stage can have its own time limit and notification settings.
          </p>
        </div>
        <div className="p-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={stages}
              strategy={verticalListSortingStrategy}
            >
              {stages.map((stage) => (
                <SortableStage key={stage.id} stage={stage} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Stage Configuration */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-medium text-neutral-900">Stage Configuration</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {stages.map((stage) => (
              <div key={stage.id} className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-900">{stage.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">
                      Time Limit (days)
                    </label>
                    <input
                      type="number"
                      value={stage.timeLimit}
                      onChange={(e) => {
                        const newStages = stages.map(s =>
                          s.id === stage.id
                            ? { ...s, timeLimit: parseInt(e.target.value) }
                            : s
                        );
                        setStages(newStages);
                      }}
                      className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={stage.notifications}
                      onChange={(e) => {
                        const newStages = stages.map(s =>
                          s.id === stage.id
                            ? { ...s, notifications: e.target.checked }
                            : s
                        );
                        setStages(newStages);
                      }}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-neutral-700">
                      Enable notifications
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSettings;