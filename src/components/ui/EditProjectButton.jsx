"use client";

import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function EditProjectButton({ projectId, slug }) {
    const router = useRouter();
    
    //variable needs to match file structure
    const uuid = projectId;

    const handleEdit = () => {
        router.push(`/projects/edit/${uuid}`);
    };

    return (
        <Button size="sm" variant="secondary" className="bg-orange-300" onClick={handleEdit}>
            Edit Project
        </Button>
    );
}