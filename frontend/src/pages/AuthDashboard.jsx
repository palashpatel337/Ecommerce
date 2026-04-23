import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);

  useEffect(() => {
    const fetchUserAndSync = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        console.log("No session found");
        return;
      }

      setUser(session.user);

      // send token to backend to store in mongodb
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/sync-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const result = await response.json();
      console.log("Mongo Sync Result:", result);

      setMongoUser(result.user);
    };

    fetchUserAndSync();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Dashboard</h2>

      {user ? (
        <>
          <h3>Supabase User</h3>
          <p><b>ID:</b> {user.id}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Name:</b> {user.user_metadata?.full_name}</p>

          <img
            src={user.user_metadata?.avatar_url}
            alt="avatar"
            width="100"
          />

          <hr />

          <h3>MongoDB Stored User</h3>
          {mongoUser ? (
            <>
              <p><b>Mongo ID:</b> {mongoUser._id}</p>
              <p><b>Supabase ID:</b> {mongoUser.supabaseId}</p>
              <p><b>Email:</b> {mongoUser.email}</p>
              <p><b>Full Name:</b> {mongoUser.fullName}</p>
            </>
          ) : (
            <p>Syncing user to MongoDB...</p>
          )}

          <br />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading session...</p>
      )}
    </div>
  );
}