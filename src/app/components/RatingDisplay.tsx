const RatingDisplay = ({ averageRating }: { averageRating: number }) => {
    const flooredRating = Math.floor(averageRating);

    let stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < flooredRating) {
            stars.push(<span key={i}>&#9733;</span>);
        } else {
            stars.push(<span key={i}>&#9734;</span>);
        }
    }

    return <div className='flex text-yellow-300'>{stars}</div>;
};

export default RatingDisplay;
