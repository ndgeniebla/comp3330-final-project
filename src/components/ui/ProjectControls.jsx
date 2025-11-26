import EditProjectButton from "./EditProjectButton"
import DeleteProjectButton from "./DeleteProjectButton"

export default function ProjectControls({ slug, projectId }) {
    return (
    <div className="flex gap-2">
        <EditProjectButton slug={slug} projectId={projectId}/>
        <DeleteProjectButton projectId={projectId}/>
    </div>)
}