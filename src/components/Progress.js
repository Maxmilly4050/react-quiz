function Progress({index, numQuestions}) {
    return (
        <div className="progress">
            <p>Question <strong>{index + 1}</strong>/{numQuestions}</p>
        </div>
    )
}

export default Progress
