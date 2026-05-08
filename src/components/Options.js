function Options({ questions, index, dispatch, answer }) {
    const answered = answer !== null;

    return (
        <div className="options">
            <h2>Question {index + 1}</h2>
            <h3>{questions[index].question}</h3>
            {questions[index].options.map((option, i) => (
                <button className={`btn btn-option ${answer === i ? "answer" : ""} 
                        ${answered ? (questions[index].correctOption === i ? "correct" : "wrong"):""} `}
                        key={i} 
                        onClick={() => dispatch({ type: 'newAnswer', payload: i })}
                        disabled = {answered}

                        >
                    {option}
                </button>
            ))}
        </div>
    )
}

export default Options
