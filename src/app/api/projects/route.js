import { fetchProjects } from "@/lib/db";

export async function GET() {
    const projects = await fetchProjects();
    return Response.json({ projects });
}
