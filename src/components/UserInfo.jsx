import React from 'react';

const UserInfo = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <h2>User Information</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Add more user information as needed */}
    </div>
  );
};

export default UserInfo;
