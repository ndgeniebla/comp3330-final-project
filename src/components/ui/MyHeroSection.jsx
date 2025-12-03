import {
    Card,
    CardContent,
} from "@/components/ui/card";
import Image from "next/image";

export default function MyHero({ heroData }) {
    return (
        <Card className="w-full border-none shadow-none bg-zinc-50 dark:bg-black">
          <div className="flex gap-6 items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Image
                src={heroData.avatar}
                alt={heroData.fullName}
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h1 className="font-black text-4xl mb-2">{heroData.fullName}</h1>
              <p className="text-lg text-muted-foreground mb-4">{heroData.shortDescription}</p>
              <p className="text-base leading-relaxed">{heroData.longDescription}</p>
            </div>
          </div>

          <CardContent className="mt-6">
            <Image
              src="/placeholder-hero-img.jpg"
              alt="hero image"
              width={2000}
              height={1000}
              className="rounded-lg"
            />
          </CardContent>
        </Card>
    );
}