import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

const ReviewsContainer = ({ review }: any) => {
    const { feedback, comment } = review?.fields;
    const { firstName, lastName } = review?.customer[0]?.fields;

    return (
        <div className='flex py-4' key={review?.sys?.id}>
            <div className="w-2/12 flex">
                <div
                    className={`rounded-full
                                        ${feedback === 'positive' ? 'bg-blue-700' : 'bg-red-700'}
                                        h-12
                                        w-12
                                        flex
                                        items-center
                                        justify-center`}>{feedback === 'positive' ? '+' : '-'}
                </div>
            </div>
            <div className='w-10/12 gap-4 grid'>
                <h3 className='italic text-lg'>{firstName} {lastName}</h3>
                <p>{documentToPlainTextString(comment)}</p>
            </div>
        </div>
    )
};

export default ReviewsContainer;
