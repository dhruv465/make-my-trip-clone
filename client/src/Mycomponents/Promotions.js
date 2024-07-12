import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10 -mr-5"
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10 -ml-5"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    );
};

const Promotions = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '0px',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024, // tablet breakpoint
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640, // mobile breakpoint
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="w-full max-w-7xl mx-auto my-8 relative px-10 mt-14">
            <Slider {...settings}>
                {promotions.map((promo, index) => (
                    <div key={index} className="px-2">
                        <div className="bg-white rounded-xl shadow-xl p-4 flex items-center h-24 slideItem">
                            <img src={promo.img} alt="" className="mr-4 flex-shrink-0" height="68px" width="68px" />
                            <p className="text-sm text-gray-800 leading-tight">{promo.text}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

const promotions = [
    {
        img: "https://tripmoneycmsimgak.mmtcdn.com/img/Acko_1_a95a85f8c1.png",
        text: "Insurance made easy – Acko"
    },
    {
        img: "https://tripmoneycmsimgak.mmtcdn.com/img/AA_70x70_bb9ca3d36b.jpg",
        text: "Embark on your travels with world class assistance, anytime-anywhere!"
    },
    {
        img: "https://tripmoneycmsimgak.mmtcdn.com/img/Travel_Guard_Icon_02_97a71bc27f.png",
        text: "You can enrol yourself in the Group Travel Insurance Policy purchased by MMT from Tata AIG General Insurance Company"
    },
    {
        img: "https://promos.makemytrip.com/Growth/Images/B2C/Uncompressed/Artboard_travRep.png",
        text: "Check out our Indian Travel Trends Report. Our trends report 2023-24 is out now. Read on for top travel insights."
    },
    {
        img: "https://promos.makemytrip.com/Growth/Images/B2C/xhdpi/ic_whatsnew_flight.png",
        text: "Book Flights with Voice Chat! Code: MMTMYRA will be auto-applied for EXTRA discounts!"
    },
    {
        img: "https://promos.makemytrip.com/images/CDN_upload/indiannessapphome2.png",
        text: "Finding Indian Food just got easier! Use newly launched filters to find Indian food during International travel"
    },
    {
        img: "https://promos.makemytrip.com/notification/xhdpi/Vande-Flight-10072020.png",
        text: "Planning to book an international flight? Check Travel Guidelines"
    },
    {
        img: "https://promos.makemytrip.com/Growth/Images/B2C/2x/language1@2x_20210901.png",
        text: "We are now available in हिंदी! Change Language"
    },
    {
        img: "https://tripmoneycmsimgak.mmtcdn.com/img/RIL_1_468ef5d7a7.png",
        text: "Travel light, leave your worries behind with Reliance General Insurance"
    },
    {
        img: "https://tripmoneycmsimgak.mmtcdn.com/img/abhi_1_223c8a2989.png",
        text: "Karo Acchi Sehat Ka Iraada, Chuno Insurance Jo De Zyada"
    },
];

export default Promotions;
