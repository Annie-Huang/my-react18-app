import React from 'react';
import { Suspense } from 'react';
import { useAtom } from 'jotai';
import { useResetAtom, atomWithStorage } from 'jotai/utils';

import './App.css';

const quoteIdAtom = atomWithStorage('quoteid', '0');

const Component = () => {
  const [quoteId, setQuoteId] = useAtom(quoteIdAtom);
  const resetQuoteId = useResetAtom(quoteIdAtom);
  return (
    <>
      <div>QuoteId: {quoteId}</div>
      <button onClick={() => setQuoteId('123')}>Set QuoteId to 123</button>
      <button onClick={resetQuoteId}>resetQuoteId</button>
    </>
  );
};

const App = () => {
  const [quoteId, setQuoteId] = useAtom(quoteIdAtom);
  const resetQuoteId = useResetAtom(quoteIdAtom);
  console.log('quoteId=', quoteId);

  return (
    // <Suspense fallback='Loading...'>
    <div className='App'>
      <h1>Hello Jotai</h1>
      <h2>Enjoy coding!</h2>
      {/* <Component /> */}
      <div>QuoteId: {quoteId}</div>
      <button onClick={() => setQuoteId('123')}>Set QuoteId to 123</button>
      <button onClick={resetQuoteId}>resetQuoteId</button>
    </div>
    // </Suspense>
  );
};

export default App;
