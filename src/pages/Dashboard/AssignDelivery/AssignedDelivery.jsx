import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDelivery = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "Driver Assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=Driver Assigned`
      );
      return res.data;
    },
  });

  const handleConfirm = (parcel) => {
    const updateStatus = { deliveryStatus: "Rider Arriving" };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, updateStatus)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thanks for Accepting",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <h1 className="font-bold text-4xl">
        Assigned Delivery: {parcels.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Confirmation</th>
              <th>Other Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.deliveryStatus === "Driver Assigned" ? (
                    <>
                      <button
                        onClick={() => handleConfirm(parcel)}
                        className="btn btn-primary text-black"
                      >
                        Comfirm
                      </button>
                      <button className="btn btn-warning text-black ms-1.5">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Confirm</span>
                  )}
                </td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDelivery;
