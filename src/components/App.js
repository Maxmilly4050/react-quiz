import Header from './Header';
import Error from './Error';
import Loader from './Loader';
import Main from './Main';
import { useEffect, useReducer } from 'react';
import StartScreen from './StartScreen';
import Question from './Question';

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
      return {
        ...state,
        answer: action.payload,
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
};

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState);

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
      </Main>
    </div>
  );
}

export default App;
