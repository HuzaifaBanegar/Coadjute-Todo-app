import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    try {
        const { ids } = await request.json();
        
        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json(
                { message: "Invalid request format" }, 
                { status: 400 }
            );
        }

        const response = await axios.patch(
            "http://localhost:8000/api/todos-bulkcompleted", 
            { ids }
        );

        return NextResponse.json({
            message: "Todos updated successfully",
            updatedIds: ids,
        });
    } catch (error: any) {
        console.error("Bulk update failed:", error.message);
        return NextResponse.json(
            { message: "Something went wrong", error: error.message }, 
            { status: 500 }
        );
    }
}