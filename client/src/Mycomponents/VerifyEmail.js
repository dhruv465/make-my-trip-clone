import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
    const { token } = useParams();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/verify/${token}`);
                if (response.ok) {
                    toast.success('Email verified successfully!');
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || 'Failed to verify email.');
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                toast.error('Failed to verify email.');
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="text-center mt-8">
            <h1 className="text-2xl font-bold">Verifying your email...</h1>
        </div>
    );
};

export default VerifyEmail;
