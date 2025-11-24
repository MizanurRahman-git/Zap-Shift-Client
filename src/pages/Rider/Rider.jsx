import React from "react";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router";

const Rider = () => {
  //   const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
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

  const handleRiderApplication = () => {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <h1 className="font-bold text-4xl mt-3.5">Be a Rider</h1>
        <p className="text-gray-500 mt-2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <form onSubmit={handleSubmit(handleRiderApplication)} className="mt-10">
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

      <div>{/* image */}</div>
    </div>
  );
};

export default Rider;
