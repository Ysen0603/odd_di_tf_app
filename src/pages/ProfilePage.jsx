import React from 'react';

const ProfilePage = ({ user }) => {
  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-white">Profil Utilisateur</h1>
      {user ? (
        <div className="space-y-4">
          <p className="text-xl text-gray-300">
            <span className="font-semibold">Nom d'utilisateur:</span> {user.username}
          </p>
          <p className="text-xl text-gray-300">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          {/* Ajoutez d'autres informations utilisateur si disponibles */}
        </div>
      ) : (
        <p className="text-xl text-red-500">Utilisateur non connecté</p>
      )}
    </div>
  );
};

export default ProfilePage;
