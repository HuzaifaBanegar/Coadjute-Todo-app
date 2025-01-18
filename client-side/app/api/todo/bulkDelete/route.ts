import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { ids } = await request.json(); 

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ message: "Invalid request format" }, { status: 400 });
    }

    const response = await axios.delete("http://localhost:8000/api/todos-deleteAll", {
      data: { ids },
    });

    return NextResponse.json({ message: "Todos deleted successfully", deletedIds: ids });
  } catch (error) {
    console.error("Bulk delete failed:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}