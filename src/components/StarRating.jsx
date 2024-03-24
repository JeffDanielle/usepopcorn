const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
}

const starContainerStyle = {
    display: 'flex',
    gap: '4px',
}

const textStyle = {
    lineHeight: "0",
    margin: "0",
};

const StarRating = ({ maxRating = 5 }) => {

    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <span >🌟{i + 1}</span>
                ))}
            </div>
            <p style={textStyle}>10</p>
        </div>
    );
}

export default StarRating;