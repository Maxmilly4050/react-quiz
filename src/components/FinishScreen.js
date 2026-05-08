function FinishScreen({ points, totalPoints }) {
    const percentage = Math.round(points / totalPoints * 100);

    let emoji = '😭';
    if (percentage >= 50) emoji = '😊';
    if (percentage >= 80) emoji = '🤩';
    return (
        <p className="result">
            You scored <strong>{points}</strong> out of {totalPoints} points! ({percentage}%) {emoji}
        </p>
    )
}

export default FinishScreen
