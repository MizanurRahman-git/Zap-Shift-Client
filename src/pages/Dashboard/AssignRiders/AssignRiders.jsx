import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const riderModalRef = useRef();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", "Panding-Pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=Panding-Pickup"
      );
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistricts, "Available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=Approved&district=${selectedParcel?.senderDistricts}&workStatus=Available`
      );
      return res.data;
    },
  });

  const handleModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };


  const handleAssignRider = rider => {
    const riderAssignInfo = {
        riderId: rider._id,
        riderEmail: rider.rideremail,
        riderName: rider.ridername,
        parcelId: selectedParcel._id
    }

    axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
    .then(res=> {
        if(res.data.modifiedCount){
            riderModalRef.current.close()
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Rider Has Been Assigned",
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
  }


  return (
    <div>
      <h2>Assign Riders: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Create At</th>
              <th>PickUp District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistricts}</td>
                <td>
                  <button
                    onClick={() => handleModal(parcel)}
                    className="btn btn-primary text-black"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Rider Available: {riders.length}
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Assign</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, i) => (
                  <tr key={rider._id}>
                    <th>{i+1}</th>
                    <td>{rider.ridername}</td>
                    <td>{rider.rideremail}</td>
                    <td>
                        <button onClick={()=> handleAssignRider(rider)} className="btn btn-primary text-black">Assign</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
