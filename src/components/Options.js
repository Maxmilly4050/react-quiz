function Options({ questions, index, dispatch }) {
    return (
        <div className="options">
            <h2>Question {index + 1}</h2>
            <h3>{questions[index].question}</h3>
            {questions[index].options.map((option, i) => (
                <button className="btn btn-option {" 
                        key={i} 
                        onClick={() => dispatch({ type: 'newAnswer', payload: i })}
                        >
                    {option}
                </button>
            ))}
        </div>
    )
}

export default Options
