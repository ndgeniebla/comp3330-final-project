"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./button";

export default function DeleteProjectButton({ projectId }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const promise = fetch(`/api/projects/${projectId}`, { method: "DELETE" }).then((res) => {
                if (!res.ok) throw new Error(`Delete failed (${res.status})`);
                return res;
            });

            await toast.promise(promise, {
                loading: "Deleting project...",
                success: "Project deleted",
                error: "Failed to delete project. Try again.",
            });

            router.refresh();
        } catch (err) {
            console.error("Delete project error:", err);
        }
    };

    return (
        <Button size="sm" className="bg-red-400 text-black" onClick={handleDelete}>
          Delete Project
        </Button>
    );
}