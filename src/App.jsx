import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(name, email, user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("User added Successfully!");
          form.reset();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Simple Crud</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <input type="email" name="email" id="" />
        <input type="submit" value="Add User" />
      </form>
      <Link to="/users">Go to users page</Link> <br />
      <Link to="/update">Go to user update page</Link>
    </div>
  );
}

export default App;
