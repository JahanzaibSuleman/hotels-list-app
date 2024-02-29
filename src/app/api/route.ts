import { NextResponse, type NextRequest } from "next/server";
import { getHotelsFromSource } from "./getHotelsFromSource";

// Function to filter items by content type
const filterItemsByContentType = (items: any, contentTypeId: string) => {
  return items.filter(
    (item: any) => item.sys.contentType.sys.id === contentTypeId
  );
};

// Handler for GET request
export async function GET(request: NextRequest) {
  try {
    // Extracting query parameters
    const searchParams = request.nextUrl.searchParams;
    const skip = +searchParams.get("skip") || 0;
    const limit = +searchParams.get("limit") || 0;

    // Fetching hotels, reviews, and customers
    const { items, includes } = await getHotelsFromSource();
    const reviews = filterItemsByContentType(items, "review");
    const hotelsData = filterItemsByContentType(items, "hotel");
    const customers = filterItemsByContentType(items, "customer");

    // Preparing hotels data
    const preparedHotelsObjArray = hotelsData.map((hotel: any) => {
      // Filtering reviews for the current hotel
      const filteredReviews = reviews.filter((review: any) => {
        return review.fields.hotel.sys.id === hotel.sys.id;
      });

      // Adding customers to reviews
      const reviewsWithCustomers = filteredReviews.map((review: any) => {
        const filteredCustomer = customers.filter((customer: any) => {
          return review.fields.customer.sys.id === customer.sys.id;
        });

        return { ...review, customer: filteredCustomer };
      });

      // Finding assets for the hotel
      const assets = includes.Asset.filter(
        (asset: any) => asset.sys.id === hotel.fields.images[0].sys.id
      );

      // Merging hotel data with reviews and assets
      return { ...hotel, reviewsWithCustomers, assets };
    });

    // Slicing hotels array based on skip and limit
    let slicedHotelsArray = preparedHotelsObjArray;
    if (!!skip || !!limit) {
      slicedHotelsArray = preparedHotelsObjArray.slice(skip, skip + limit);
    }

    // Returning response
    return NextResponse.json({
      response: slicedHotelsArray,
      total: preparedHotelsObjArray.length,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching hotels:", error);
    return NextResponse.error(new Error("Failed to fetch hotels."));
  }
}
