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
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const initialState = {
  questions: [],
  status: 'loading',
};

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

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
        {status === 'active' && <Question />}
      </Main>
    </div>
  );
}

export default App;
