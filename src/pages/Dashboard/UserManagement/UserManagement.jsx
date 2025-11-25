import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });


  const handleMakeAdmin = (id, name) => {
    const updateRole = { role: "admin" };
    axiosSecure.patch(`/users/${id}`, updateRole).then((res) => {
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
    axiosSecure.patch(`/users/${id}`, updateRole).then((res) => {
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
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
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
                    <button onClick={()=> handleMakeUser(user._id, user.displayName)} className="btn bg-red-500">
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id, user.displayName)}
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
