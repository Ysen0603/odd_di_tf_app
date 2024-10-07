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
      <div className="flex h-screen bg-gradient-to-t from-zinc-950 via-neutral-800 to-slate-200">
        <div className="w-1/3 bg-gray-200 shadow-lg overflow-hidden">
          <h2 className="text-2xl font-bold p-6 bg-gradient-to-r from-black via-yellow-700 to-yellow-900">WhatsChat</h2>
          <ul className="divide-y divide-gray-200">
            {users.map(user => (
              <li
                key={user.id}
                className={`p-4 bg-black hover:bg-orange-950 cursor-pointer transition duration-300 ease-in-out ${selectedUser?.id === user.id ? 'bg-black bg-opacity-80' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={`http://localhost:8000${user.profile_picture}` || 'https://via.placeholder.com/40'}
                      alt={user.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-700"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${user.is_active ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user.username}</p>
                    <p className="text-xs text-white">{user.is_active ? 'Online' : 'Offline'}</p>
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
            <div className="flex-1 flex items-center justify-center bg-white">
              <p className="text-2xl text-black animate-pulse">Select a user to initiate communication</p>
            </div>
          )}
        </div>
      </div>
    );
}

export default ChatPage;