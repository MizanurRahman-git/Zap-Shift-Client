import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDeliveres = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "Driver Assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=Parcel Delivered`
      );
      return res.data;
    },
  });


  const calculatePayout = parcel => {
    if(parcel.senderDistricts === parcel.reciverDistricts){
        return parcel.cost*0.8
    }
    else{
        return parcel.cost*0.6
    }
  }
  return (
    <div>
      <h2 className="font-bold text-4xl">
        Completed Deliveres: {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Pickup District</th>
              <th>Delivery District</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>WithDraw</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i+1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderDistricts}</td>
                <td>{parcel.reciverDistricts}</td>
                <td>{parcel.cost}</td>
                <td>{calculatePayout(parcel)}</td>
                <td>
                    <button className="btn btn-primary text-black">Cash Out</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveres;
