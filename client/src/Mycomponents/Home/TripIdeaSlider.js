import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute right-0 -top-10 transform rounded-l-none -translate-y-1/2 bg-white rounded-full text-blue-500 w-12 h-12 flex items-center justify-center  shadow-xl z-10 -mr-6"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute right-4 -top-10 rounded-r-none transform -translate-y-1/2 bg-white text-blue-500 rounded-full w-12 h-12 flex items-center justify-center drop-shadow-2xl shadow-xl z-10 -ml-6"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    );
};
const TripIdeaSlider = () => {
    const collections = [
        {
            index: 0,
            title: 'Stays in & Around Delhi for a Weekend Getaway',
            imgSrc:
                'https://hblimg.mmtcdn.com/content/hubble/img/delhi_hotels_tiow/mmt/activities/m_Le%20ROI%20Floating%20Huts_Eco%20Rooms_Tehri_Uttarakhand_l_550_821.jpg?im=Resize=(400,462)',
        },
        {
            index: 1,
            title: 'Stays in & Around Mumbai for a Weekend Getaway',
            imgSrc:
                'https://hblimg.mmtcdn.com/content/hubble/img/seo_img/mmt/activities/m_Radisson_blu_image_seo_l_550_821.jpg?im=Resize=(400,462)',
        },
        // {
        //     index: 2,
        //     title: 'Stays in & Around Bangalore for a Weekend Getaway',
        //     imgSrc:
        //         'https://hblimg.mmtcdn.com/content/hubble/img/bangalore_hotel_tiow/mmt/activities/m_Waterwoods%20Lodges%20&amp;%20Resorts_Kabini_l_550_821.jpg?im=Resize=(400,462)',
        // },
        {
            index: 3,
            title: 'Beach Destinations',
            imgSrc:
                'https://hblimg.mmtcdn.com/content/hubble/img/collections/m_beach44_p_540_417.jpg?im=Resize=(400,462)',
        },
        {
            index: 4,
            title: 'Weekend Getaways',
            imgSrc:
                'https://hblimg.mmtcdn.com/content/hubble/img/collections/m_weekend44_p_540_417.jpg?im=Resize=(400,462)',
        },
        {
            index: 5,
            title: 'Hill Stations',
            imgSrc:
                'https://hblimg.mmtcdn.com/content/hubble/img/collections/m_hill_stations11_p_540_417.jpg?im=Resize=(400,462)',
        },
        {
            index: 6,
            title: 'Adventure Destinations',
            imgSrc:
                'https://hblimg.mmtcdn.com/content/hubble/img/Australia/mmt/destination/m_Australia_destination_6_l_361_641.jpg?im=Resize=(400,462)',
        },
        {
            index: 7,
            title: 'Heritage Destinations',
            imgSrc:
                'https://hblimg.mmtcdn.com//content/hubble/img/amritsar/mmt/destination/m_Amritsar_activity_heritage_l_684_1026.jpg?im=Resize=(400,462)',
        },
        {
            index: 8,
            title: 'Pilgrimage Destinations',
            imgSrc:
                'https://hblimg.mmtcdn.com/content/hubble/img/collections/m_pilgrimage44_p_540_417.jpg?im=Resize=(400,462)',
        },
        {
            index: 9,
            title: 'Relaxation Destinations',
            imgSrc:
                'https://hblimg.mmtcdn.com//content/hubble/img/alleppey/mmt/destination/m_destination-alleppey-landscape_l_400_640.jpg?im=Resize=(400,462)',
        },
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto px-8  bg-white rounded-lg p-6  max-w-6xl justify-center drop-shadow-xl ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="lg:text-3xl md:text-2xl font-bold text-gray-800 text-base mr-4">Handpicked Collections for You</h2>

            </div>



            <Slider {...settings}>
                {collections.map((item, index) => (
                    <div className="flex space-x-4 overflow-x-auto pb-4 ">
                        <div key={index} className="flex-none w-64 sm:w-72 md:w-80 lg:w-56">
                            <div className="relative rounded-lg overflow-hidden">
                                <img src={item.imgSrc} alt={item.title} className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                <div className="absolute bottom-0 left-0 p-4">
                                    <span className="bg-white text-black px-2 py-1 text-xs font-bold rounded">TOP {item.top}</span>
                                    <h3 className="text-white font-bold mt-2 text-sm sm:text-base">{item.title}</h3>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </Slider>


        </div>
    );
};

export default TripIdeaSlider;