# DoFlow - Task Management App

A modern, responsive task management application built with Next.js, MongoDB Atlas, and shadcn/ui components.

## Features

- ✅ **Modern UI** with glassmorphism effects and dark/light mode
- ✅ **Mobile Responsive** design that works on all devices
- ✅ **MongoDB Atlas Integration** for persistent data storageclo
- ✅ **Real-time Updates** with API integration
- ✅ **Professional Design** with shadcn/ui components
- ✅ **Task Management** - Add, complete, and delete tasks
- ✅ **Progress Tracking** with completion statistics
- ✅ **Error Handling** with user-friendly error messages

## Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **UI Components**: shadcn/ui
- **Icons**: React Icons (Feather Icons)
- **Styling**: Tailwind CSS with custom gradients

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <https://github.com/Vaibhavdixit1/do-flow>
cd doflow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Sign up or log in to your account

2. **Create a New Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Your Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect"
   - Choose "Drivers"
   - Copy the connection string

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/doflow?retryWrites=true&w=majority
```

Replace the connection string with your actual MongoDB Atlas connection string.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

## Features in Detail

### Task Management
- Add new tasks with a clean input interface
- Mark tasks as complete/incomplete
- Delete tasks with confirmation
- Real-time updates across all operations

### Statistics Dashboard
- Total tasks count
- Pending tasks count
- Completion percentage
- Visual progress indicators

### User Experience
- Dark/light mode toggle with shadcn Switch
- Responsive design for all screen sizes
- Loading states and error handling
- Smooth animations and transitions
- Professional glassmorphism design

### Database Features
- Persistent data storage in MongoDB Atlas
- Optimistic UI updates
- Error handling and validation
- Automatic timestamps for tasks

## Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- Any platform supporting Node.js

Make sure to set the `MONGODB_URI` environment variable in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
