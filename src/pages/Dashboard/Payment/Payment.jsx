import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Payment = () => {
    const {parcelid} = useParams()
    const axiosSecure = useAxiosSecure()

    const {isLoading, data: parcel} = useQuery({
        queryKey: ['parcels', parcelid],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/${parcelid}`)
            return res.data
        }
    })

    if(isLoading){
        return <span className="loading loading-dots loading-xl"></span>
    }

    return (
        <div>
            <h1>please payment. Parcen Name: {parcel.parcelName}</h1>
            <button className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;