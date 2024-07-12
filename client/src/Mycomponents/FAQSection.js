import React from 'react';

const FAQSection = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <section itemScope itemType="https://schema.org/FAQPage" className="space-y-6">
                        <article>
                            <div itemType="https://schema.org/Question" itemProp="mainEntity" itemScope className="mb-6">
                                <h2 itemProp="name" className="text-lg font-semibold text-gray-900 mb-2">Why MakeMyTrip?</h2>
                                <div itemType="https://schema.org/Answer" itemProp="acceptedAnswer" itemScope>
                                    <div itemProp="text" className="text-xs text-gray-600 leading-relaxed">
                                        Established in 2000, MakeMyTrip has since positioned itself as one of the leading companies, providing great offers, competitive airfares, exclusive discounts, and a seamless online booking experience to many of its customers. The experience of booking your flight tickets, hotel stay, and holiday package through our desktop site or mobile app can be done with complete ease and no hassles at all. We also deliver amazing offers, such as Instant Discounts, Fare Calendar, MyRewardsProgram, MyWallet, and many more while updating them from time to time to better suit our customers' evolving needs and demands.
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>

                    <section className="space-y-6">
                        <article>
                            <div itemType="https://schema.org/Question" itemProp="mainEntity" itemScope className="mb-6">
                                <h2 itemProp="name" className="text-lg font-semibold text-gray-900 mb-2">Booking Flights with MakeMyTrip</h2>
                                <div itemType="https://schema.org/Answer" itemProp="acceptedAnswer" itemScope>
                                    <div itemProp="text" className="text-xs text-gray-600 leading-relaxed">
                                        At MakeMyTrip, you can find the best of deals and cheap air tickets to any place you want by booking your tickets on our website or app. Being India's leading website for hotel, flight, and holiday bookings, MakeMyTrip helps you book flight tickets that are affordable and customized to your convenience. With customer satisfaction being our ultimate goal, we also have a 24/7 dedicated helpline to cater to our customer's queries and concerns. Serving over 5 million happy customers, we at MakeMyTrip are glad to fulfill the dreams of folks who need a quick and easy means to find air tickets. You can get a hold of the cheapest flight of your choice today while also enjoying the other available options for your travel needs with us.
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>

                    <section className="space-y-6">
                        <article>
                            <div itemType="https://schema.org/Question" itemProp="mainEntity" itemScope className="mb-6">
                                <h2 itemProp="name" className="text-lg font-semibold text-gray-900 mb-2">Domestic Flights with MakeMyTrip</h2>
                                <div itemType="https://schema.org/Answer" itemProp="acceptedAnswer" itemScope>
                                    <div itemProp="text" className="text-xs text-gray-600 leading-relaxed">
                                        MakeMyTrip is India's leading player for flight bookings. With the cheapest fare guarantee, experience great value at the lowest price. Instant notifications ensure current flight status, instant fare drops, amazing discounts, instant refunds and rebook options, price comparisons and many more interesting features.
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;