import React, { useState, useEffect, useRef, useCallback } from 'react';
import axiosInstance from '../axiosConfig';
import { FaPaperPlane } from 'react-icons/fa';

function Chat({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const currentUserId = localStorage.getItem('userId');
  const socketRef = useRef(null);

  // Gestionnaire de messages WebSocket
  const handleWebSocketMessage = useCallback((event) => {
    try {
      const message = JSON.parse(event.data);
      if (message.content && message.content.trim() !== '') {
        // Vérifier si le message concerne la conversation actuelle
        if (
          (message.sender_id === parseInt(currentUserId) && message.receiver_id === selectedUser.id) ||
          (message.sender_id === selectedUser.id && message.receiver_id === parseInt(currentUserId))
        ) {
          setMessages(prevMessages => {
            // Vérifier si le message existe déjà
            const messageExists = prevMessages.some(m => m.id === message.id);
            if (!messageExists) {
              return [...prevMessages, {
                ...message,
                isCurrentUser: message.sender_id === parseInt(currentUserId),
                timestamp: new Date(message.timestamp).toISOString()
              }];
            }
            return prevMessages;
          });
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  }, [currentUserId, selectedUser.id]);

  // Création de la connexion WebSocket
  const createWebSocketConnection = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }

    const ws = new WebSocket(`ws://localhost:8000/ws/${currentUserId}`);
    
    ws.onopen = () => {
      console.log('Chat WebSocket connected');
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log('Chat WebSocket disconnected');
      setTimeout(createWebSocketConnection, 5000);
    };

    ws.onerror = (error) => {
      console.error('Chat WebSocket error:', error);
    };

    ws.onmessage = handleWebSocketMessage;
    socketRef.current = ws;

    return ws;
  }, [currentUserId, handleWebSocketMessage]);

  // Initialisation de la connexion WebSocket
  useEffect(() => {
    if (currentUserId) {
      const ws = createWebSocketConnection();
      
      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    }
  }, [currentUserId, createWebSocketConnection]);

  // Chargement des messages existants
  useEffect(() => {
    setMessages([]);
    
    if (selectedUser) {
      axiosInstance.get(`/messages/${selectedUser.id}`)
        .then(response => {
          const formattedMessages = response.data.map(message => ({
            ...message,
            isCurrentUser: message.sender_id === parseInt(currentUserId)
          }));
          setMessages(formattedMessages);
        })
        .catch(error => console.error('Error fetching messages:', error));
    }
  }, [selectedUser, currentUserId]);

  // Envoi de message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser && socketRef.current?.readyState === WebSocket.OPEN) {
      try {
        const messageData = {
          content: newMessage.trim(),
          receiver_id: selectedUser.id,
          sender_id: parseInt(currentUserId),
          timestamp: new Date().toISOString()
        };

        socketRef.current.send(JSON.stringify(messageData));
        setNewMessage('');

        // Si le WebSocket est fermé, le reconnecter
        if (socketRef.current?.readyState !== WebSocket.OPEN) {
          createWebSocketConnection();
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Scroll automatique
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Tri des messages
  const sortedMessages = [...messages].sort((a, b) => 
    new Date(a.timestamp) - new Date(b.timestamp)
  );

  return (
    <div className="flex flex-col h-full bg-blue-50">
      <div className="bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
          <img
            src={`http://localhost:8000${selectedUser.profile_picture}` || 'https://via.placeholder.com/40'}
            alt={selectedUser.username}
            className="w-10 h-10 rounded-full object-cover border-2 border-white mr-3"
          />
          <h2 className="text-2xl font-semibold text-white">{selectedUser.username}</h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedMessages.map((message, index) => (
          <div
            key={message.id || index}
            className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            {message.isCurrentUser ? null : (
              <img
                src={`http://localhost:8000${selectedUser.profile_picture}` || 'https://via.placeholder.com/32'}
                alt={selectedUser.username}
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
            )}
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isCurrentUser
                  ? 'bg-blue-400 text-white'
                  : 'bg-white text-gray-800'
              } shadow-md`}
            >
              {message.content}
            </div>
            {message.isCurrentUser && (
              <img
                src={`http://localhost:8000${localStorage.getItem('userProfilePicture')}` || 'https://via.placeholder.com/32'}
                alt="You"
                className="w-8 h-8 rounded-full object-cover ml-2"
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="bg-white border-t border-gray-200 p-4">
        <div className="flex rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 min-w-0 block w-full px-4 py-3 bg-gray-100 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPaperPlane className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;