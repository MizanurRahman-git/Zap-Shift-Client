import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const [paymentInfo, setPaymentInfo] = useState({})
    const sessionId = searchParams.get('session_id')
    const axiosSecure = useAxiosSecure()
    


    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=> {
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data .trackingId
                })

                console.log(res.data)
            })
        }
    },[sessionId, axiosSecure])


    return (
        <div>
            <h1 className='font-bold text-2xl'>Payment Successful</h1>
            <p>Your Transaction ID: <span className='font-bold'>{paymentInfo.transactionId}</span></p>
            <p>Your Tracking ID: <span className='font-bold'>{paymentInfo.trackingId}</span></p>
        </div>
    );
};

export default PaymentSuccess;