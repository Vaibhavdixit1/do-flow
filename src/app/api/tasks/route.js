import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Task from '@/models/Task';

// GET /api/tasks - Get all tasks
export async function GET() {
  try {
    await connectDB();
    
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      data: tasks 
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(request) {
  try {
    await connectDB();
    
    const { title } = await request.json();
    
    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Task title is required' },
        { status: 400 }
      );
    }
    
    const task = await Task.create({
      title: title.trim()
    });
    
    return NextResponse.json({ 
      success: true, 
      data: task 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
