import Image from "next/image";
import MyHero from "@/components/ui/MyHeroSection";
import CalendarWidget from "@/components/github-calendar";

const HERO_PLACEHOLDER_AVATAR = "https://placehold.co/200x200?text=Avatar";

const defaultHeroContent = {
  avatar: HERO_PLACEHOLDER_AVATAR,
  fullName: "Your Name",
  shortDescription: "Full-stack developer & designer",
  longDescription:
    "Welcome to my portfolio. I build beautiful, functional web applications.",
};

export default async function Home() {
  let heroData = defaultHeroContent;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hero`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      const dbHero = json?.data;
      if (dbHero) {
        heroData = {
          avatar: dbHero.avatar || HERO_PLACEHOLDER_AVATAR,
          fullName: dbHero.fullName || defaultHeroContent.fullName,
          shortDescription: dbHero.shortDescription || defaultHeroContent.shortDescription,
          longDescription: dbHero.longDescription || defaultHeroContent.longDescription,
        };
      }
    }
  } catch (err) {
    console.error("Error fetching hero from DB:", err);
    // Fall back to defaults
  }

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-5xl flex-col items-center justify-between py-8 px-4 bg-zinc-50 dark:bg-black sm:items-start">
        <MyHero heroData={heroData} />
        <CalendarWidget />
      </main>
    </div>
  );
}