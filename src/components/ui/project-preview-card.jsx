import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./button";
import { Skeleton } from "./skeleton";
import Image from "next/image"

    // title: "Project One",
    // desc: "Short blurb.",
    // img: "https://placehold.co/300.png",
    // link: "#"

export default function ProjectPreviewCard({ project }) {
  return ( 
    <Card className="py-4 px-4 m-2">
      <h2 className="font-bold">{project.title}</h2>
      <Image src={project.img} width="300" height="300"></Image>
      {/* <Skeleton className="m-[300px] h-[300px]"/> */}
      <CardDescription>
        { project.desc }
      </CardDescription>
      <Button>Learn More</Button>
    </Card>
  );
}
