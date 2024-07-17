import React from 'react'
import Header from '../Mycomponents/Home/Header'
import Details from '../Mycomponents/Dashboard/Details'
import UserProfileCard from '../Mycomponents/Dashboard/UserProfileCard'


const Dashboard = () => {
    return (
        <div>
            <Header />

            <div className="container mx-auto mt-8 p-4">
                <div className="flex flex-col lg:flex-row lg:justify-center lg:space-x-8">
                    <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
                        <UserProfileCard />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <Details />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard