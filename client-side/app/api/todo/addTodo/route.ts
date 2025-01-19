import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const response = await axios.post("http://localhost:8000/api/todos", data);
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ "message": "Something went wrong" });
    }
}