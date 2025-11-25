import Image from "next/image";
import MyHero from "@/components/ui/MyHeroSection";
import CalendarWidget from "@/components/github-calendar";
import { fetchProjects } from "@/lib/db";


export default async function Home() {
  console.log("i'm here")
  console.log(await fetchProjects());
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-5xl flex-col items-center justify-between py-8 px-4 bg-zinc-50 dark:bg-black sm:items-start">
        <MyHero />
        <CalendarWidget />
      </main>
    </div>
  );
}
