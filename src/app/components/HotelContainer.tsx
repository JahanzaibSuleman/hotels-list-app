import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getHotels } from '../api/getHotels';
import HotelContent from './HotelContent';
import Spinner from './Spinner';

// Component to fetch and display hotels
const HotelsContainer = () => {
    // State to manage pagination
    const [skip, setSkip] = useState(0);
    // State to store hotel data
    const [hotelsData, setHotelsData] = useState<any>([]);
    // Query to fetch hotels
    const { data, status, isLoading } = useQuery({
        queryKey: ['hotels', skip],
        queryFn: () => getHotels(skip),
    });

    // Function to load more hotels
    const onLoadMore = () => {
        setSkip(prev => {
            if (prev < data?.total - 1) {
                return prev + 1;
            }
            return prev;
        });
    }

    // Update hotel data when query is successful
    useEffect(() => {
        const { response } = data || { response: [] };

        if (status === 'success' && response) {
            setHotelsData((prev: any) => [...prev, ...response]);
        }
    }, [data, status]);

    return (
        <div className='flex flex-col items-center'>
            {/* Display spinner while loading */}
            {isLoading && <Spinner />}
            {/* Display error message if something went wrong */}
            {data?.exception && <p className='text-red-700'>Something went wrong</p>}
            {/* Display hotels */}
            {!data?.exception &&
                hotelsData?.map(
                    (hotel: any) => <HotelContent key={hotel?.sys?.id} hotel={hotel} />
                )}
            {/* Button to load more hotels */}
            <button
                className={`rounded bg-lime-500 w-fit p-4 ${skip >= data?.total - 1 && 'hidden'}`}
                onClick={onLoadMore}>
                Load More
            </button>
        </div>
    )
}

export default HotelsContainer;
