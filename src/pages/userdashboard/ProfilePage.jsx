import React from "react";
import { useGetUserProfileQuery } from "../../services/api/apiSlice";

function ProfilePage() {
  const { data: user, isLoading, isError } = useGetUserProfileQuery();

  if (isLoading) return <p className="p-6">Loading profile...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Failed to load profile.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-800 dark:text-gray-200">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover shadow-lg"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
          <p className="mb-1">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Role:</span> {user.role}
          </p>
          <p className="mb-1">
            <span className="font-semibold">User ID:</span> {user.id}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(user.creationAt).toLocaleDateString()}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Last Updated:</span>{" "}
            {new Date(user.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
