import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import UserDetails from './UserDetails';

function UserDetailsWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useDataContext();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/posts.json');
        if (!response.ok) throw new Error('Failed to load posts');
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      }
    };

    fetchPosts();
  }, []);

  const user = users.find((u) => u.id === parseInt(id));
  if (!user) return <p className="text-center mt-20">User not found</p>;

  const userPosts = posts.filter((post) => post.userId === user.id);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">{`Loading ${user.name}'s posts...`}</p>
      </div>
    );
  }

  return <UserDetails user={user} posts={userPosts} onBack={() => navigate('/')} />;
}

export default UserDetailsWrapper;
