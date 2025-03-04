import { useState } from "react";
import { Task } from "@/types/task";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateTask } from "@/utils/api";

interface TaskCardProps {
    task: Task;
    onDelete: (id: number) => void;
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
    const [taskData, setTaskData] = useState(task);
    const [editingField, setEditingField] = useState<null | keyof Task>(null);

    // Handle inline update
    const handleUpdate = async (field: keyof Task, value: any) => {
        setTaskData((prev) => ({ ...prev, [field]: value }));

        try {
            await updateTask(task.id, { [field]: value });
        } catch (error) {
            console.error("❌ Error updating task:", error);
        }
    };

    return (
        <Card className="p-4 shadow-md hover:shadow-lg transition-all bg-white">
            <CardHeader>
                {editingField === "title" ? (
                    <input
                        autoFocus
                        type="text"
                        value={taskData.title}
                        onChange={(e) => handleUpdate("title", e.target.value)}
                        onBlur={() => setEditingField(null)}
                        className="w-full text-lg font-bold bg-transparent border-none outline-none"
                    />
                ) : (
                    <CardTitle onClick={() => setEditingField("title")} className="cursor-pointer">
                        {taskData.title}
                    </CardTitle>
                )}
            </CardHeader>

            <CardContent className="space-y-2">
                {editingField === "description" ? (
                    <textarea
                        autoFocus
                        value={taskData.description}
                        onChange={(e) => handleUpdate("description", e.target.value)}
                        onBlur={() => setEditingField(null)}
                        className="w-full bg-transparent border-none outline-none resize-none"
                    />
                ) : (
                    <p onClick={() => setEditingField("description")} className="cursor-pointer text-gray-600">
                        {taskData.description || "Click to add description..."}
                    </p>
                )}

                <Select onValueChange={(value) => handleUpdate("priority", value)} defaultValue={taskData.priority}>
                    <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>

            <CardFooter className="flex justify-between">
                <Button
                    variant={taskData.completed ? "default" : "outline"}
                    onClick={() => handleUpdate("completed", !taskData.completed)}
                >
                    {taskData.completed ? "Completed" : "Pending"}
                </Button>
                <Button variant="destructive" onClick={() => onDelete(task.id)}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
