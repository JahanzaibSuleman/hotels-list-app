'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import HotelsContainer from "./HotelContainer";

const queryClient = new QueryClient()

const HotelsList = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <HotelsContainer />
        </QueryClientProvider>
    )
}

export default HotelsList;
