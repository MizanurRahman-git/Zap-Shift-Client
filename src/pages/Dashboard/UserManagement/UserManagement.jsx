import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (id, name) => {
    const updateRole = { role: "admin" };
    axiosSecure.patch(`/users/${id}/role`, updateRole).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} maked as an admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleMakeUser = (id, name) => {
    const updateRole = { role: "user" };
    axiosSecure.patch(`/users/${id}/role`, updateRole).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} maked as an user`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">User Management: {users.length}</h2>
      <div className="flex justify-center">
        <label className="input my-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            required
            placeholder="Search User"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Others Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td className="flex items-center gap-1.5">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={user.photoURL} alt="image" />
                  </div>
                  <div>
                    <h1 className="font-bold">{user.displayName}</h1>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleMakeUser(user._id, user.displayName)}
                      className="btn bg-red-500"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleMakeAdmin(user._id, user.displayName)
                      }
                      className="btn bg-green-500"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <td>Action</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
