"use client"

import { useState, useEffect } from 'react';
import { FiPlus, FiCheck, FiClock, FiCheckCircle, FiTrash2, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Home = ({ 
  isDarkMode
}) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from MongoDB
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks');
      const result = await response.json();
      
      if (result.success) {
        setTasks(result.data);
      } else {
        setError('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newTask.trim() }),
        });

        const result = await response.json();
        
        if (result.success) {
          setTasks([result.data, ...tasks]);
          setNewTask('');
        } else {
          setError('Failed to add task');
        }
      } catch (error) {
        console.error('Error adding task:', error);
        setError('Failed to add task');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      if (!task) return;

      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      const result = await response.json();
      
      if (result.success) {
        setTasks(tasks.map(task => 
          task._id === id ? { ...task, completed: !task.completed } : task
        ));
      } else {
        setError('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setTasks(tasks.filter(task => task._id !== id));
      } else {
        setError('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6">
      {/* Error Message */}
      {error && (
        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-red-900/50 border-red-700' : 'bg-red-50 border-red-200'
        } border`}>
          <p className={`text-sm ${
            isDarkMode ? 'text-red-300' : 'text-red-700'
          }`}>
            {error}
          </p>
        </div>
      )}

      {/* TOP ROW - Input and Stats */}
      <div className="space-y-4">
        {/* Task Input Card */}
        <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} backdrop-blur-sm`}>
          <CardContent className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Add New Task
              </h2>
              <p className={`text-sm sm:text-base ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                What would you like to accomplish today?
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your task here..."
                className="flex-1 text-base sm:text-lg"
              />
              <Button
                onClick={handleAddTask}
                disabled={!newTask.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 sm:px-8 sm:py-6 text-base sm:text-lg font-medium"
              >
                <FiPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} backdrop-blur-sm`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className={`text-sm sm:text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Total Tasks
                </h3>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 flex items-center justify-center`}>
                  <FiTarget className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                </div>
              </div>
              <div className={`text-2xl sm:text-4xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {totalTasks}
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} backdrop-blur-sm`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className={`text-sm sm:text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Pending
                </h3>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-500/20 flex items-center justify-center`}>
                  <FiClock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                </div>
              </div>
              <div className={`text-2xl sm:text-4xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {pendingTasks.length}
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} backdrop-blur-sm`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className={`text-sm sm:text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Progress
                </h3>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-500/20 flex items-center justify-center`}>
                  <FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                </div>
              </div>
              <div className={`text-2xl sm:text-4xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {completionRate}%
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* BOTTOM ROW - Task Lists */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Pending Tasks */}
          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} backdrop-blur-sm`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className={`text-lg sm:text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Active Tasks
                </h3>
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  {pendingTasks.length}
                </Badge>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {pendingTasks.length > 0 ? (
                  pendingTasks.map((task) => (
                    <div key={task._id} className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600 hover:border-gray-500' 
                        : 'bg-gray-50/50 border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <button
                          onClick={() => toggleComplete(task._id)}
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0 ${
                            isDarkMode
                              ? 'border-gray-500 hover:border-green-400 hover:bg-green-900'
                              : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                          }`}
                        >
                          {task.completed && <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />}
                        </button>
                        
                        <span className={`flex-1 text-sm sm:text-lg break-words ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </span>
                        
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer p-1 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex-shrink-0"
                        >
                          <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={`text-center py-8 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <FiClock className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm sm:text-lg">No active tasks</p>
                    <p className="text-xs sm:text-sm">Add a task to get started</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Completed Tasks */}
          <Card className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'} backdrop-blur-sm`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className={`text-lg sm:text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Completed
                </h3>
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  {completedTasks.length}
                </Badge>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {completedTasks.length > 0 ? (
                  completedTasks.map((task) => (
                    <div key={task._id} className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700/50 border-gray-600' 
                        : 'bg-gray-50/50 border-gray-200'
                    }`}>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <button
                          onClick={() => toggleComplete(task._id)}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 border-2 border-green-500 flex items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0"
                        >
                          <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </button>
                        
                        <span className={`flex-1 text-sm sm:text-lg line-through break-words ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {task.title}
                        </span>
                        
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 cursor-pointer p-1 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex-shrink-0"
                        >
                          <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={`text-center py-8 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <FiCheckCircle className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm sm:text-lg">No completed tasks</p>
                    <p className="text-xs sm:text-sm">Complete some tasks to see them here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;

