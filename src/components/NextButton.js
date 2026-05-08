function NextButton({ dispatch, answer, index, numQuestions }) {
    if (answer === null) return null;
    return (
        <div>
            <button className="btn btn-ui" onClick={() => dispatch(index < numQuestions - 1 ? { type: 'nextQuestion' } : { type: 'finish' })}>
               {index < numQuestions - 1 ? "Next Question" : "Finish"} 
            </button>
        </div>
    )
}

export default NextButton
