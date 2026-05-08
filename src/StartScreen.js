function StartScreen({questions}) {
    return (
        <div className="start">
            <h2>Welcome to the Quiz App!</h2>
            <h3>{questions.length} Questions to test your React mastery</h3>
            <button className="btn btn-ui">Let's Start</button>
        </div>
    )
}

export default StartScreen
