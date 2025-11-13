import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSlug } from "@/lib/utils";
import ProjectPreviewCard from "@/components/ui/project-preview-card";

export default async function ProjectsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, { cache: "no-store" });
  const { projects } = await res.json();

  return (
    <div className="flex items-center justify-center">
    {projects.map((p) => {
        const slug = createSlug(p.title);
        return (
          <ProjectPreviewCard key={slug} project={p} slug={slug}/>
        /* <Card key={slug} className="group hover:scale-105 transition-transform">
            <h3>{p.title}</h3>
            <div className="space-y-3">
            <Image
                src={p.img}
                alt={p.title}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded-md"
            />
            <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
            <div className="flex gap-2">
                <Button asChild size="sm" variant="secondary">
                <a href={p.link} target="_blank" rel="noreferrer">Open</a>
                </Button>
                <Button asChild size="sm">
                <Link href={`/projects/${slug}`}>Details</Link>
                </Button>
            </div>
            </div>
        </Card> */
        );
    })}
    </div>
  );
}