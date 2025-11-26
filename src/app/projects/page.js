"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSlug } from "@/lib/utils";
import ProjectPreviewCard from "@/components/ui/project-preview-card";
import { useUser } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [ projects, setProjects ] = useState([]);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const getSetProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, { cache: "no-store" });
        const data = await res.json();

        // Handle different possible payload shapes: an array, or an object with a `projects` array
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          // Fallback to empty array to avoid .map errors
          setProjects([]);
        }
      } catch (e) {
        // On fetch/parsing error, ensure projects is an array
        setProjects([]);
        console.error("Failed to load projects", e);
      }
    }
    getSetProjects();
  }, [])

  return (
    <div className="flex items-center justify-center flex-wrap max-w-full m-auto">
    {Array.isArray(projects) && projects.map((p) => {
        const slug = createSlug(p.title);
        return (
          <ProjectPreviewCard key={slug} project={p} slug={slug} user={user}/>
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