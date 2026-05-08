import Options from './Options';

function Question({ questions, index, dispatch, answer }) {
    return (
        <Options questions={questions} index={index} dispatch={dispatch} answer={answer} />
    )
}

export default Question
