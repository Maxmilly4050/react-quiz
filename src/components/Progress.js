function Progress({index, numQuestions, points, totalPoints, answer}) {
    if (index >= numQuestions) return null;   
    return (
        <div className="progress">
            <progress value={index} max={numQuestions} />
            <p>Question <strong>{index + 1}</strong>/{numQuestions}</p>
            <p>Points: <strong>{points}</strong>/{totalPoints}</p>
        </div>
    )
}

export default Progress
