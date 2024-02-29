import { memo, useState } from "react";
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import RatingDisplay from "./RatingDisplay";
import ReviewsContainer from "./ReviewsContainer";

// Component for displaying hotel content
const HotelContent = ({ hotel }: any) => {
    // State to control the visibility of reviews
    const [showReviews, setShowReviews] = useState(false);

    // Function to toggle the display of reviews
    const onToggleReviews = () => {
        setShowReviews(prev => !prev);
    }

    // Destructuring hotel object for easier access to its properties
    const { name, rating, city, country, description, price, startDate, endDate } = hotel?.fields;
    const { value, symbol } = price;
    const { url: imageUrl } = hotel?.assets[0]?.fields?.file;

    // Formatting start and end dates
    const startDateObj = new Date(startDate);
    const startFormattedDate = startDateObj.toLocaleString('de-DE', { dateStyle: 'medium' });
    const endDateObj = new Date(endDate);
    const endFormattedDate = endDateObj.toLocaleString('de-DE', { dateStyle: 'medium' });

    return (
        <div className="container my-4 mx-auto border-2 border-lime-500 rounded">
            <div className="flex gap-4 p-4">
                <div className="w-4/12"><img className="object-cover rounded" src={`https:${imageUrl}`} /></div>
                <div className="w-8/12 gap-4 grid">
                    <div className="flex justify-between">
                        <div className="text-2xl">{name}</div>
                        <div><RatingDisplay averageRating={rating} /></div>
                    </div>
                    <div>{city} - {country}</div>
                    <div>{documentToPlainTextString(description)}</div>
                    <div className="flex justify-between">
                        <div>
                            {/* Button to toggle reviews visibility */}
                            <button className="rounded bg-blue-500 w-fit p-4" onClick={onToggleReviews}>
                                Show Reviews
                            </button>
                        </div>
                        <div>
                            <div className="font-bold text-lg">{value} {symbol}</div>
                            <div>{startFormattedDate} - {endFormattedDate}</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Container to display reviews, conditionally rendered based on showReviews state */}
            <div className={`${!showReviews && 'hidden'} container p-4 border-t-2 border-red-100`}>
                {/* Mapping through reviews and rendering ReviewContainer component */}
                {hotel?.reviewsWithCustomers?.map((review: any) => {
                    return (
                        <ReviewsContainer key={review?.sys?.id} review={review} />
                    )
                })}
            </div>
        </div>
    );
}

// Memoizing the component for performance optimization
export default memo(HotelContent);
