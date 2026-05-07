import Header from './Header';
import Main from './Main';
import { useEffect, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        data: action.payload,
        status: 'ready',
        error: null
      };
    case 'dataError':
      return {
        ...state,
        status: 'error',
        error: action.payload
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const initialState = {
  data: null,
  error: null,
  status: 'idle'
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then(response => response.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(error => dispatch({ type: 'dataError', payload: error.message }));
  }, []);

  return (
    <div className='app'>
      <Header />

      <Main >
        <p>This is the main content.</p>
      </Main>
    </div>
  );
}

export default App;
