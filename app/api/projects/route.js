import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

export async function GET() {
  await dbConnect(); // Ensure MongoDB is connected

  try {
    // Insert sample data if no projects exist
    const existingProjects = await Project.find();
    if (existingProjects.length === 0) {
      await Project.create({
        name: "First Project",
        description: "This is my first project",
        status: "pending",
      });
      console.log("✅ First project added!");
    }

    // Fetch all projects
    const projects = await Project.find();
    return Response.json({ projects });
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return Response.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const { title, client, status, deadline, amount } = await req.json();
    const newProject = new Project({ title, client, status, deadline, amount });
    await newProject.save();
    return NextResponse.json(newProject);
  } catch (error) {
    return Response.json({ error: "Failed to POST projects" }, { status: 500 });
  }
}
