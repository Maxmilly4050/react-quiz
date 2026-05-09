import { useEffect, useReducer } from 'react';

import Header from './Header';
import Error from './Error';
import Loader from './Loader';
import Main from './Main';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

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
        secondsRemaining: state.questions.length * secondsPerQn,
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
    case 'finish':
      return {
        ...state,
        status: 'finished',
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      }
    
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
const secondsPerQn = 20;

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

function App() {
  const [{ questions, status, index, answer, points, secondsRemaining }, dispatch] = useReducer(reducer, initialState);
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then(response => response.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(error => dispatch({ type: 'dataError' }));
  }, []);

  return (
    <div className='app'>
      <Header />
      {status !== 'finished' && <Progress index={index} numQuestions={questions.length} points={points} totalPoints={totalPoints} />}
      <Main >
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen questions={questions} dispatch={dispatch} />}
        {status === 'active' && <Question questions={questions} index={index} dispatch={dispatch} answer={answer} />}
        <Footer>
          {status === 'active' && <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />}
          {status === 'active' && <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={questions.length} />}
        </Footer>
        {status === 'finished' && <FinishScreen points={points} totalPoints={totalPoints} />}
      </Main>
    </div>
  );
}

export default App;
