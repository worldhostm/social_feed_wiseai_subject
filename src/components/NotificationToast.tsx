'use client';

import React from 'react';
import { X, MessageCircle, Heart, Repeat2, Plus } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useTheme } from '@/contexts/ThemeContext';

export function NotificationToast() {
  const { notifications, removeNotification } = useNotifications();
  const { theme } = useTheme();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_post':
        return <Plus className="w-4 h-4 text-blue-500" />;
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'retweet':
        return <Repeat2 className="w-4 h-4 text-green-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Plus className="w-4 h-4 text-blue-500" />;
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            p-4 rounded-lg shadow-lg border animate-in slide-in-from-right-full duration-300
            ${theme === 'dark' 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-200 text-gray-900'
            }
          `}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {notification.message}
              </p>
              <p className="text-xs opacity-60 mt-1">
                방금 전
              </p>
            </div>
            
            <button
              onClick={() => removeNotification(notification.id)}
              className={`
                flex-shrink-0 p-1 rounded-full transition-colors
                ${theme === 'dark' 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}