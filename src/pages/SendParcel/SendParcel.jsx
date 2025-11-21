import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {

  const axiosSecure = useAxiosSecure()

  const {user} = useAuth()

  const { register, handleSubmit, control } = useForm();

  const serviceCenters = useLoaderData();

  const duplicateRegions = serviceCenters.map((c) => c.region);

  const regions = [...new Set(duplicateRegions)];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const reciverRegion = useWatch({ control, name: "reciverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((r) => r.region === region);

    const districts = regionDistricts.map((d) => d.district);

    return districts;
  };

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistricts === data.reciverDistricts;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraweight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraweight * 40
          : extraweight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I Agree!",
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.post('/parcels', data)
        .then(res=> {
          console.log("after Saving Parcel:", res.data)
        })

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });

    // console.log(cost);
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)} className="mt-10">
        <div>
          <label className="label mr-4 text-black font-semibold">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label text-black font-semibold">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">
              Parcel Name
            </label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label text-black font-semibold">
              Parcel Weight
            </label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* sender information */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-semibold">Sender Details</h2>

            <label className="label text-black font-semibold">
              Sender Name
            </label>
            <input
              type="text"
              {...register("sendername")}
              className="input w-full"
              defaultValue={user.displayName}
              placeholder="Sender Name"
            />

            <label className="label text-black font-semibold">
              Sender Address
            </label>
            <input
              type="text"
              {...register("senderaddress")}
              className="input w-full"
              placeholder="Sender Address"
            />

            <label className="label text-black font-semibold">
              Sender Email
            </label>
            <input
              type="email"
              {...register("senderemail")}
              className="input w-full"
              defaultValue={user.email}
              placeholder="Sender Email"
            />

            <label className="label text-black font-semibold">
              Sender Phone
            </label>
            <input
              type="number"
              {...register("senderphone")}
              className="input w-full"
              placeholder="Sender Phone"
            />

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a Region"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>

                {regions.map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register("senderDistricts")}
                defaultValue="Pick a Districts"
                className="select"
              >
                <option disabled={true}>Pick a Districts</option>

                {districtsByRegion(senderRegion).map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            <label className="label text-black font-semibold">
              Pickup Instruction
            </label>
            <input
              type="text"
              {...register("senderinstruction")}
              className="input w-full"
              placeholder="Pickup Instruction"
            />
          </fieldset>

          {/* reciver information */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-semibold">Reciver Details</h2>

            <label className="label text-black font-semibold">
              Reciver Name
            </label>
            <input
              type="text"
              {...register("recivername")}
              className="input w-full"
              placeholder="Reciver Name"
            />

            <label className="label text-black font-semibold">
              Reciver Address
            </label>
            <input
              type="text"
              {...register("reciveraddress")}
              className="input w-full"
              placeholder="Reciver Address"
            />

            <label className="label text-black font-semibold">
              Reciver Email
            </label>
            <input
              type="email"
              {...register("reciveremail")}
              className="input w-full"
              placeholder="Reciver email"
            />

            <label className="label text-black font-semibold">
              Reciver Phone
            </label>
            <input
              type="number"
              {...register("reciverphone")}
              className="input w-full"
              placeholder="Reciver Phone"
            />

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Reciver Regions</legend>
              <select
                {...register("reciverRegion")}
                defaultValue="Pick a Region"
                className="select"
              >
                <option disabled={true}>Pick a Region</option>

                {regions.map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Reciver Districts</legend>
              <select
                {...register("reciverDistricts")}
                defaultValue="Pick a Districts"
                className="select"
              >
                <option disabled={true}>Pick a Districts</option>

                {districtsByRegion(reciverRegion).map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            <label className="label text-black font-semibold">
              Delivary Instruction
            </label>
            <input
              type="text"
              {...register("reciverinstruction")}
              className="input w-full"
              placeholder="Delivary Instruction"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black w-full mt-5"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
