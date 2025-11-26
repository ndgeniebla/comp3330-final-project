import EditProjectForm from "@/components/edit-project-form";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Project",
  description: "Edit an existing project",
};

export default async function EditProjectPage({ params }) {
  const { uuid } = await params;
  console.log(uuid);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/projects/${uuid}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const json = await res.json();
  const project = json?.data;

  if (!project) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <TypographyH1>Edit Project</TypographyH1>
          <TypographyP className="text-sm text-muted-foreground mt-1">
            Update project details or remove the project.
          </TypographyP>
        </div>
      </header>

      <section>
        <EditProjectForm project={project} uuid={project.id} />
      </section>
    </div>
  );
}