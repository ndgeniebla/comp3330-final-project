export async function GET() {
    const projects = [
        {
            title: "Project One",
            description: "Short blurb of Project 1.",
            img: "https://placehold.co/300.png",
            link: "https://github.com/ndgeniebla/",
            keywords: ["test", "testing"]
        },
        {
            title: "Project Two",
            description: "Short blurb of Project 2.",
            img: "https://placehold.co/300.png",
            link: "https://github.com/ndgeniebla/",
            keywords: ["test", "testing"]
        },
        {
            title: "Project Three",
            description: "Short blurb of Project 3.",
            img: "https://placehold.co/300.png",
            link: "https://github.com/ndgeniebla/",
            keywords: ["test", "testing"]
        },
    ];
    return Response.json({ projects });
}
