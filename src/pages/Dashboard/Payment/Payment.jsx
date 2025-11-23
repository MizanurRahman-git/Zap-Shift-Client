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


    const handlePayment = async() =>{
        const paymentInfo = {
            cost: parcel.cost,
            parcelName: parcel.parcelName,
            senderEmail: parcel.senderemail,
            parcelId: parcel._id
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        window.location.href = res.data.url
        console.log(res.data)
    }


    if(isLoading){
        return <span className="loading loading-dots loading-xl"></span>
    }

    return (
        <div>
            <h1>please pay $ {parcel.cost}. Parcen Name: {parcel.parcelName}</h1>
            <button onClick={handlePayment} className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;