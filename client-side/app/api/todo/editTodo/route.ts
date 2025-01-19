import axios from 'axios';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    // Parse the incoming request body
    const data = await request.json();

    // Extract `_id` from the body
    const { _id, ...updateData } = data;

    // Ensure `_id` is provided
    if (!_id) {
      return NextResponse.json(
        { message: "Todo ID (_id) is required" },
        { status: 400 }
      );
    }

    // Forward the PATCH request to the Node.js API
    const response = await axios.patch(
      `http://localhost:8000/api/todos/${_id}`, // Send the `_id` in the URL
      updateData // Send only the fields to update in the body
    );

    // Return the response from the Node.js API
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error forwarding PATCH request:", error);

    // Handle errors and return an appropriate response
    return NextResponse.json(
      {
        message: "Failed to update todo",
        error: error?.response?.data || null,
      },
      { status: error?.response?.status || 500 }
    );
  }
}
