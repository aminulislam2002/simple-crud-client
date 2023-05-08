import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDelete = (_id) => {
    console.log("Delete", _id);
    fetch(`http://localhost:5000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("Deleted successfully");
          const remaining = users.filter((user) => user._id !== _id);
          setUsers(remaining);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Users {users.length}</h2>
      <Link to="/">Go to add user page</Link>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} <br /> {user.email} <br />
            {user._id} <br />{" "}
            <Link to={`/update/${user._id}`}>
              <button>Update</button>
            </Link>{" "}
            <button onClick={() => handleDelete(user._id)}>X</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
