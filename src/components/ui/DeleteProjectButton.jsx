"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./button";

export default function DeleteProjectButton({ projectId }) {
    const router = useRouter();

    const handleDelete = async () => {
        // Show confirmation dialog
        const confirmed = window.confirm(
            "Are you sure you want to delete this project? This action cannot be undone."
        );

        if (!confirmed) return;

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

            router.push("/projects");
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