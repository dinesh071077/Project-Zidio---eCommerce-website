import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const  Supportquery = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/support/get');
        const data = await res.json();
        setQueries(data);
      } catch (err) {
        console.error('Failed to fetch queries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-blue-400 hover:underline mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Customer Support Queries</h2>

        {loading ? (
          <p className="text-center text-gray-300">Loading...</p>
        ) : queries.length === 0 ? (
          <p className="text-center text-gray-400">No support queries found.</p>
        ) : (
          <div className="overflow-x-auto bg-gray-800 rounded shadow-lg">
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Message</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((q) => (
                  <tr key={q._id} className="border-b border-gray-700 hover:bg-gray-700/40">
                    <td className="py-2 px-4">{q.name}</td>
                    <td className="py-2 px-4">{q.email}</td>
                    <td className="py-2 px-4">{q.phone}</td>
                    <td className="py-2 px-4 max-w-sm break-words">{q.message}</td>
                    <td className="py-2 px-4">
                      {new Date(q.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Supportquery;
