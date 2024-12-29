import React from 'react';
import './App.css';
import { ComponentA } from './components/ComponentA';
import { ComponentB } from './components/ComponentB';

function App() {
  return (
    <div>
      {/* Normal react-hook-form with useForm and useFieldArray*/}
      {/*<ComponentA />*/}

      {/* Normal react-hook-form with useForm and useFieldArray + zod*/}
      <ComponentB />
    </div>
  );
}

export default App;
