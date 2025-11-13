import Image from "next/image";
import MyNavBar from "@/components/ui/MyNavBar";
import MyHero from "@/components/ui/MyHeroSection";
import ProjectPreviewCard from "@/components/ui/project-preview-card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-4xl flex-col items-center justify-between py-8 px-4 bg-zinc-50 dark:bg-black sm:items-start">
        <MyHero />
        {/* <section className="flex flex-row items-center justify-center w-full">
          {projects.map((p, i) => <ProjectPreviewCard key={i} project={p} />)}
        </section> */}
      </main>
    </div>
  );
}
