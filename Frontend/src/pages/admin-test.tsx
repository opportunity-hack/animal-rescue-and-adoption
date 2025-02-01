import React from "react";
import { useUser } from "../hooks/useUser";

const AdminTest: React.FC = () => {
  const { data: user, isLoading, isError, error } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }

  if (!user || !user.data) {
    return <div>Please log in</div>;
  }

  if (user.data.role.perm_level < 5) {
    return (
      <div>You do not have permission to access this page - basic access</div>
    );
  }

  if (user.data.role.perm_level === 5) {
    return <div>You have volunteer access</div>;
  }

  if (user.data.role.perm_level === 10) {
    return <div>You have admin access</div>;
  }

  return (
    <div>
      <h1>Logged In</h1>
    </div>
  );
};

export default AdminTest;
