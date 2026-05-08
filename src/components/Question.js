import Options from './Options';

function Question({ questions, index, dispatch, answer }) {
    if (index >= questions.length) return null;
    return (
        <Options questions={questions} index={index} dispatch={dispatch} answer={answer} />
    )
}

export default Question
