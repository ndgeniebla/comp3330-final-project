import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export default function NotFound() {
    return (
        <div className="bg-zinc-50 max-w-2xl m-auto p-4">
            <TypographyH1>Well… this is awkward.</TypographyH1>
            <TypographyP>The page you’re looking for doesn’t exist (or is hiding really well). Let’s get you back on track.</TypographyP>
            <Button asChild size="sm" className="mt-4">
              <Link href={`/`}>Go Home</Link>
            </Button>
        </div>
    )
}