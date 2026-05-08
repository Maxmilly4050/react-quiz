function NextButton({ dispatch, answer, index }) {
    if (answer === null) return null;
    return (
        <div>
            <button className="btn btn-ui" onClick={() => dispatch(index < 15 ? { type: 'nextQuestion' } : { type: 'finished' })}>
               {index < 14 ? "Next Question" : "Finish"} 
            </button>
        </div>
    )
}

export default NextButton
