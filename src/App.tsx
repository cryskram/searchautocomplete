import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";

interface UserProp {
  firstName: string;
  id: number;
  image: string;
  age: number;
  company: {
    department: string;
  };
  username: string;
}

interface UsersData {
  limit: number;
  skip: number;
  total: number;
  users: UserProp[];
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<unknown[]>([]);
  const [param, setParam] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<unknown[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (event: any) => {
    const query = event.target.value.toLowerCase();
    setParam(query);

    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter(
              (item: UserProp) =>
                item.firstName.toLowerCase().indexOf(query) > -1
            ) // checks if it is present or not
          : [];

      setFilteredUsers(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data: UsersData = await response.json();
      console.log(data);

      if (data && data.users && data.users) {
        setUsers(data.users);
        // setUsers(data.users.map((item: UserProp) => item.firstName));
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(
    users,
    filteredUsers.map((item: UserProp) => item.firstName)
  );

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <h1 className="text-2xl md:text-5xl font-bold uppercase font-megrim">
        Search Autocomplete
      </h1>
      <input
        className="border-2 border-gray-300 px-4 py-2 text-xl rounded m-4 outline-none placeholder:text-lg"
        value={param}
        onChange={handleChange}
        type="text"
        name="search-users"
        placeholder="Enter the username to search..."
      />
      {param ? (
        <div className="grid grid-cols-1 md:grid-cols-3">
          {showDropdown ? (
            <div>
              {filteredUsers.map((user: UserProp, idx) => (
                <UserCard
                  key={idx}
                  name={user.firstName}
                  age={user.age}
                  work={user.company.department}
                  username={user.username}
                  image={user.image}
                />
              ))}
            </div>
          ) : (
            <div>
              <h1>No Users found</h1>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3">
          {users.map((user: UserProp, idx) => (
            <UserCard
              key={idx}
              name={user.firstName}
              age={user.age}
              work={user.company.department}
              username={user.username}
              image={user.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
