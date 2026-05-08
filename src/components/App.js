import Header from './Header';
import Error from './Error';
import Loader from './Loader';
import Main from './Main';
import { useEffect, useReducer } from 'react';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataError':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
      };
    case 'newAnswer':
      const question = state.questions.at(state.index)

      return {
        ...state,
        answer: action.payload,
        points: question.correctOption === action.payload ?
          question.points + state.points : state.points,
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
};

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then(response => response.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(error => dispatch({ type: 'dataError' }));
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main >
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen questions={questions} dispatch={dispatch} />}
        {status === 'active' && <Question questions={questions} index={index} dispatch={dispatch} answer={answer} />}
      <NextButton dispatch={dispatch} answer={answer} />
      </Main>
    </div>
  );
}

export default App;
