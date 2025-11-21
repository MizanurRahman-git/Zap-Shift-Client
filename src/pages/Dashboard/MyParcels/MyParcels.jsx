import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import {useQuery} from '@tanstack/react-query';

const MyParcels = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: parcels=[]} = useQuery({
        queryKey: ['myparcels', user?.email],
        queryFn: async ()=> {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`)
            return res.data
        }
    })
    return (
        <div>
            <h1>All Of My Parcels: {parcels.length}</h1>
        </div>
    );
};

export default MyParcels;