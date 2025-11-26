import EditProjectForm from "@/components/edit-project-form";
import DeleteProjectButton from "@/components/ui/DeleteProjectButton";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Project",
  description: "Edit an existing project",
};

export default async function EditProjectPage({ params }) {
  const { slug } = params;

  // Server-side fetch to API route (use relative path to avoid HTML responses)
  let project = null;
  try {
    const res = await fetch(`/api/projects/${uuid}`, { cache: "no-store" });
    if (!res.ok) {
      return notFound();
    }
    const json = await res.json();
    project = json?.data ?? null;
  } catch (err) {
    console.error("Failed to fetch project:", err);
    return notFound();
  }

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

        <div className="flex items-center gap-2">
          <DeleteProjectButton projectId={uuid} />
        </div>
      </header>

      <section>
        {/* client component — prefilled form, handles PUT to /api/projects/{uuid} */}
        <EditProjectForm project={project} uuid={project.id} />
      </section>
    </div>
  );
}