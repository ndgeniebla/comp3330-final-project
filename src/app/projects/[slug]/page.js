import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { createSlug } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import ProjectControls from "@/components/ui/ProjectControls";
import { auth0 } from "@/lib/auth0";

// import rest of components needed.

export default async function ProjectDetailPage({ params }) {
    const session = await auth0.getSession();

    const { slug } = await params;
    console.log("slug", slug)

    const projects = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`)
        .then((res) => res.json())
        .then((data) => data.projects)
        .catch((error) => {
            console.error("Error fetching projects:", error);
            return [];
        });

    const project = projects.find((proj) => createSlug(proj.title) === slug);
    console.log("slug", slug);
    console.log("project", project);
    
    if (!project) return notFound();

    return (
        <div className="bg-zinc-50 max-w-2xl m-auto p-4">
            {/* <div>My Post's slug: {slug}</div> */}
            <TypographyH1>{project.title}</TypographyH1>
            {project.img ? (
                <Image
                    src={project.img}
                    alt={"project image"}
                    width={125}
                    height={250}
                    className="rounded-xl my-2"
                />
            ) : (
                <Skeleton className="h-[125px] w-[250px] rounded-xl mt-5" />
            )}

            <TypographyP>{project.description}</TypographyP>
            {session && 
            <div className="border-t-2 mt-6 pt-4">
                <ProjectControls projectId={project.id} slug={slug}/>
            </div>}
        </div>
    );
}
