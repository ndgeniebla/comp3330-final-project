"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projectSchema = z.object({
  title: z.string().min(2, { message: "Your title is too short" }).max(200),
  description: z
    .string()
    .min(10, { message: "Your description is too short" })
    .max(1000),
  img: z.string().url({ message: "Please enter a valid URL for the image" }),
  link: z.string().url({ message: "Please enter a valid URL for the link" }),
  keywords: z.array(z.string()).optional(),
});

export default function EditProjectForm({ project = {}, uuid }) {
  const router = useRouter();
  const [draftKeyword, setDraftKeyword] = useState("");

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project.title ?? "",
      description: project.description ?? "",
      img: project.img ?? "",
      link: project.link ?? "",
      keywords: project.keywords ?? [],
    },
  });

  const { handleSubmit, control, reset, formState } = form;
  const { isSubmitting } = formState;

  // If the server-provided project changes, reset the form
  useEffect(() => {
    reset({
      title: project.title ?? "",
      description: project.description ?? "",
      img: project.img ?? "",
      link: project.link ?? "",
      keywords: project.keywords ?? [],
    });
  }, [project, reset]);

  async function onSubmit(values) {
    try {
      const promise = fetch(`/api/projects/${uuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((res) => {
        if (!res.ok) throw new Error(`Update failed (${res.status})`);
        return res.json();
      });

      await toast.promise(promise, {
        loading: "Updating project...",
        success: "Project updated successfully",
        error: "Failed to update project. Try again.",
      });

      // navigate to project detail after success
      router.push(`/projects`);
    } catch (err) {
      console.error("Update project error:", err);
      // toast.promise already shows error
    }
  }

  const handleAddKeyword = (field) => {
    const value = draftKeyword.trim();
    const currentKeywords = field.value ?? [];
    if (!value || currentKeywords.includes(value)) return;
    field.onChange([...currentKeywords, value]);
    setDraftKeyword("");
  };

  const handleRemoveKeyword = (field, keyword) => {
    const currentKeywords = field.value ?? [];
    field.onChange(currentKeywords.filter((k) => k !== keyword));
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Project title" {...field} />
              </FormControl>
              <FormDescription>Short, descriptive title (min 2 characters)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief description" rows={6} {...field} />
              </FormControl>
              <FormDescription>Brief description (min 10 characters)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://your-image-link.com/image.png" {...field} />
              </FormControl>
              <FormDescription>URL for the project's preview image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Link</FormLabel>
              <FormControl>
                <Input placeholder="https://your-project-link.com" {...field} />
              </FormControl>
              <FormDescription>Link to live project or repository</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="keywords"
          render={({ field }) => {
            const currentKeywords = field.value ?? [];

            return (
              <FormItem>
                <FormLabel>Keywords</FormLabel>
                <div className="flex gap-2 items-start">
                  <div className="flex-1">
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          value={draftKeyword}
                          onChange={(e) => setDraftKeyword(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddKeyword(field);
                            }
                          }}
                          placeholder="Add a keyword and press Enter"
                        />
                        <Button type="button" onClick={() => handleAddKeyword(field)}>
                          Add
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>Tags to help filter projects later</FormDescription>
                  </div>

                  <div className="flex-1 flex-wrap gap-2 pt-2">
                    {currentKeywords.map((k) => (
                      <Badge key={k} variant="outline" className="flex items-center gap-2">
                        <span>{k}</span>
                        <button
                          type="button"
                          className="ml-1 text-xs"
                          onClick={() => handleRemoveKeyword(field, k)}
                          aria-label={`Remove ${k}`}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating…" : "Update project"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              reset({
                title: project.title ?? "",
                description: project.description ?? "",
                img: project.img ?? "",
                link: project.link ?? "",
                keywords: project.keywords ?? [],
              })
            }
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}