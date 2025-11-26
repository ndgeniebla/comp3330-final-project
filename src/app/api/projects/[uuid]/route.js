import { NextResponse } from "next/server";
import { getProjectById, updateProject, deleteProject } from "@/lib/db";
import { z } from "zod";
import { auth0 } from "@/lib/auth0";

const updateProjectSchema = z.object({
    title: z.string().min(2).max(200).optional(),
    description: z.string().min(10).max(1000).optional(),
    img: z.string().url().optional(),
    link: z.string().url().optional(),
    keywords: z.array(z.string()).optional(),
});

export async function GET(request, { params }) {
    const { uuid } = await params;

    const project = await getProjectById(uuid);
    if (!project) {
        return NextResponse.json(
            { message: "Project not found", data: null },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { message: "Project retrieved successfully", data: project },
        { status: 200 }
    );
}

export async function PUT(request, { params }) {
    const session = await auth0.getSession();
    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized", data: null },
            { status: 401 }
        );
    }

    const { uuid } = await params;

    try {
        const body = await request.json();
        const validated = updateProjectSchema.parse(body);

        const updated = await updateProject(uuid, validated);
        if (!updated) {
            return NextResponse.json(
                { message: "Project not found", data: null },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Project updated successfully", data: updated },
            { status: 200 }
        );
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Validation error", data: err.errors },
                { status: 400 }
            );
        }
        console.error("PUT /api/projects/[uuid] error:", err);
        return NextResponse.json(
            { message: "Internal server error", data: null },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    const session = await auth0.getSession();
    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized", data: null },
            { status: 401 }
        );
    }

    const { uuid } = await params;

    try {
        const deleted = await deleteProject(uuid);
        if (!deleted) {
            return NextResponse.json(
                { message: "Project not found", data: null },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Project deleted successfully", data: deleted },
            { status: 200 }
        );
    } catch (err) {
        console.error("DELETE /api/projects/[uuid] error:", err);
        return NextResponse.json(
            { message: "Internal server error", data: null },
            { status: 500 }
        );
    }
}
