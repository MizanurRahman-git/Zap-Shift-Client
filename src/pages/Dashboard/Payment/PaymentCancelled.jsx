import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h1 className='font-bold text-2xl'>Payment Cancelled</h1>
            <Link to='/dashboard/myparcels' className='btn btn-primary text-black'>Try Again</Link>
        </div>
    );
};

export default PaymentCancelled;