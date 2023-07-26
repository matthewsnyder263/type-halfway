import { useNavigate } from 'react-router-dom';

function UserList({ users }) {
  const navigate = useNavigate();

  return (
    <div>
      {users.map(user => (
        <div
          key={user.id}
          onClick={() => navigate(`/users/${user.id}`)}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default UserList;
