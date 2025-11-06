import Image from "next/image";
import MyNavBar from "@/components/ui/MyNavBar";
import MyHero from "@/components/ui/MyHeroSection";
import ProjectPreviewCard from "@/components/ui/project-preview-card";

const projects = [
  {
    title: "Project One",
    desc: "Short blurb.",
    img: "https://placehold.co/300.png",
    link: "#"
  },
  {
    title: "Project Two",
    desc: "Short blurb.",
    img: "https://placehold.co/300.png",
    link: "#"
  },
  {
    title: "Project Three",
    desc: "Short blurb.",
    img: "https://placehold.co/300.png",
    link: "#"
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-8 px-4 bg-zinc-50 dark:bg-black sm:items-start">
        {/* had to move sticky to the top parent because w-full on the nav bar itself refused to work. I LOVE SHADCN!!!! */}
        <div className="w-full sticky top-0 bg-zinc-50 font-sans dark:bg-black">
          <MyNavBar/>
        </div>
        <MyHero />
        <section className="flex flex-row items-center justify-center w-full">
          {projects.map((p, i) => <ProjectPreviewCard key={i} project={p} />)}
        </section>
      </main>
    </div>
  );
}
