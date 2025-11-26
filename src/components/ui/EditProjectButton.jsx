import { Button } from "./button"
import Link from "next/link"

export default function EditProjectButton({ slug }) {
    return (
    <Button asChild size="sm" variant="secondary" className="bg-orange-300">
        <Link href={`projects/${slug}/edit`}>Edit Project</Link>
    </Button>)
}