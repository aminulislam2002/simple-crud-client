import { Link, useLoaderData } from "react-router-dom";

const Update = () => {
  const loadedUser = useLoaderData();
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const updatedUser = { name, email };
    console.log(name, email);
    fetch(`http://localhost:5000/users/${loadedUser._id}`, {
      method: "PUT",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.matchedCount > 0) {
          alert("User Updated Successfully!");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Updated the user information of {loadedUser.name}</h3>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={loadedUser?.name} id="" />
        <input type="email" name="email" defaultValue={loadedUser?.email} id="" />
        <input type="submit" value="Update User" />
      </form>
      <Link to="/users">Go to users page</Link> <br />
      <Link to="/">Go to add user page</Link>
    </div>
  );
};

export default Update;
