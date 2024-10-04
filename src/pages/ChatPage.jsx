import React, { useState, useEffect } from 'react';
import Chat from '../components/Chat';
import axiosInstance from '../axiosConfig';

function ChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUserId = localStorage.getItem('userId');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/status/${currentUserId}`);
    setSocket(ws);

    ws.onopen = () => console.log('Status WebSocket connected');
    ws.onclose = () => console.log('Status WebSocket disconnected');
    ws.onerror = (error) => console.error('Status WebSocket error:', error);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'status_update') {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === data.user_id ? { ...user, is_active: data.is_active } : user
          )
        );
      }
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [currentUserId]); 
  useEffect(() => {
    axiosInstance.get('/users/list') // Changer l'endpoint pour récupérer tous les messages
        .then(response => {
            const filteredUsers = response.data.filter(user => user.id !== currentUserId);
            setUsers(filteredUsers);
        })
        .catch(error => console.error('Error fetching users:', error));
  }, [currentUserId]);
  return (
      <div className="flex h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="w-1/3 bg-white shadow-lg overflow-hidden">
          <h2 className="text-2xl font-bold p-6 bg-gradient-to-r from-blue-400 to-purple-400 text-white">WhatsChat</h2>
          <ul className="divide-y divide-gray-200">
            {users.map(user => (
              <li
                key={user.id}
                className={`p-4 hover:bg-blue-50 cursor-pointer transition duration-300 ease-in-out ${selectedUser?.id === user.id ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={`http://localhost:8000${user.profile_picture}` || 'https://via.placeholder.com/40'}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${user.is_active ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.is_active ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <Chat selectedUser={selectedUser} />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-blue-50">
              <p className="text-2xl text-blue-400 animate-pulse">Select a user to initiate communication</p>
            </div>
          )}
        </div>
      </div>
    );
}

export default ChatPage;