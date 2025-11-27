import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pandding"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const handleStatus = (id, status, workStatus, email) => {
    const updateInfo = { status: status,workStatus: workStatus, email: email };

    axiosSecure.patch(`/riders/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleApproval = (id, email) => {
    Swal.fire({
      title: "Agree with the Rider?",
      text: `You will be Approve!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatus(id, "Approved", "Available", email);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "We Don't Agree with the Rider?",
      text: `You will be Rejected!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Rejecte!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatus(id, "Rejected");
      }
    });
  };
  return (
    <div>
      <h1 className="font-medium text-3xl">
        Riders Pandding Approval: {riders.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Distrct</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.ridername}</td>
                <td>{rider.rideremail}</td>
                <td>{rider.district}</td>
                <td
                  className={`${
                    rider.status === "Approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {rider.status}
                </td>
                <td>{rider.workStatus}</td>
                <td>
                  <button
                    onClick={() => handleApproval(rider._id, rider.rideremail)}
                    className="btn"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleReject(rider._id)}
                    className="btn mx-2.5"
                  >
                    <IoPersonRemove />
                  </button>
                  <button className="btn">
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
