import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import riderImg from "../../assets/agent-pending.png";
import Swal from "sweetalert2";

const Rider = () => {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const serviceCenters = useLoaderData();
  const duplicateRegions = serviceCenters.map((c) => c.region);
  const regions = [...new Set(duplicateRegions)];

  const riderRegion = useWatch({ control, name: "region" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((r) => r.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        navigate('/')
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Application has been Submitted. we will reach to you in 24 Hours",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <h1 className="font-bold text-4xl mt-3.5">Be a Rider</h1>
        <p className="text-gray-500 mt-2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <form onSubmit={handleSubmit(handleRiderApplication)} className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* sender information */}
            <fieldset className="fieldset">
              <h2 className="text-2xl font-semibold">Rider Details</h2>

              <label className="label text-black font-semibold">
                Rider Name
              </label>
              <input
                type="text"
                {...register("ridername")}
                className="input w-full"
                defaultValue={user.displayName}
                placeholder="Rider Name"
              />

              <label className="label text-black font-semibold">
                Rider Address
              </label>
              <input
                type="text"
                {...register("rideraddress")}
                className="input w-full"
                placeholder="Rider Address"
              />

              <label className="label text-black font-semibold">
                Rider Email
              </label>
              <input
                type="email"
                {...register("rideremail")}
                className="input w-full"
                defaultValue={user.email}
                placeholder="Rider Email"
              />

              <label className="label text-black font-semibold">
                Rider Phone
              </label>
              <input
                type="number"
                {...register("riderphone")}
                className="input w-full"
                placeholder="Rider Phone"
              />

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Regions</legend>
                <select
                  {...register("region")}
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
                <legend className="fieldset-legend">Districts</legend>
                <select
                  {...register("district")}
                  defaultValue="Pick a Districts"
                  className="select"
                >
                  <option disabled={true}>Pick a Districts</option>

                  {districtsByRegion(riderRegion).map((r, i) => (
                    <option value={r} key={i}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
            </fieldset>

            {/* reciver information */}
            <fieldset className="fieldset">
              <h2 className="text-2xl font-semibold">More Details</h2>

              <label className="label text-black font-semibold">
                Driving License
              </label>
              <input
                type="text"
                {...register("license")}
                className="input w-full"
                placeholder="Driving License"
              />

              <label className="label text-black font-semibold">NID</label>
              <input
                type="text"
                {...register("nid")}
                className="input w-full"
                placeholder="NID"
              />

              <label className="label text-black font-semibold">
                Bike Information
              </label>
              <input
                type="text"
                {...register("bikeInfo")}
                className="input w-full"
                placeholder="Bike Information"
              />
            </fieldset>
          </div>
          <input
            type="submit"
            className="btn btn-primary text-black font-bold w-full mt-5"
            value="Apply As a Rider"
          />
        </form>
      </div>

      <div className="flex justify-center items-center">
        <img src={riderImg} alt="" />
      </div>
    </div>
  );
};

export default Rider;
