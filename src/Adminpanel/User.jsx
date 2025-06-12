// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function User() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/auth/all-users');
//         setUsers(res.data.users);
//       } catch (err) {
//         console.error("Failed to fetch users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="admin-users-page" style={{ padding: '20px', color: 'white', backgroundColor: '#0f172a', minHeight: '100vh' }}>
//       <h2 className="text-2xl font-bold mb-4">All Users</h2>

//       {loading ? (
//         <p>Loading users...</p>
//       ) : users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         users.map((user, index) => (
//           <div key={user._id} className="user-card" style={{ border: '1px solid #374151', padding: '15px', marginBottom: '20px', borderRadius: '10px', backgroundColor: '#1e293b' }}>
//             <p className="text-lg font-semibold text-blue-400">User #{index + 1}</p>
//             <p><strong>Name:</strong> {user.name}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Role:</strong> {user.role || 'user'}</p>
//             <p><strong>Registered At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default User;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function User() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/all-users');
        setUsers(res.data.users);
        setFilteredUsers(res.data.users);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
useEffect(() => {
  let filtered = [...users];

  if (searchTerm) {
    filtered = filtered.filter(
      (user) =>
        (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }

  if (roleFilter !== 'all') {
    filtered = filtered.filter((user) => user.role === roleFilter);
  }

  setFilteredUsers(filtered);
}, [searchTerm, roleFilter, users]);


  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/auth/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete user.');
    }
  };

  return (
    <div className="admin-users-page" style={{ padding: '20px', color: 'white', backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          color: '#60a5fa',
          fontSize: '16px',
          marginBottom: '20px',
        }}
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Admin - All Users</h2>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option value="all">All Roles</option>
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        filteredUsers.map((user, index) => (
          <div
            key={user._id}
            className="user-card"
            style={{
              border: '1px solid #374151',
              padding: '15px',
              marginBottom: '20px',
              borderRadius: '10px',
              backgroundColor: '#1e293b',
            }}
          >
            <p className="text-lg font-semibold text-blue-400">User #{index + 1}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role || 'user'}</p>
            <p><strong>Registered At:</strong> {new Date(user.createdAt).toLocaleString()}</p>

            <button
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
              onClick={() => handleDelete(user._id)}
            >
              Delete User
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default User;
