import React from 'react';
import './App.css';
import { ComponentA } from './components/ComponentA';
import { ComponentB } from './components/ComponentB';
import { ComponentC } from './components/ComponentC';
import { ComponentD } from './components/ComponentD';

function App() {
  return (
    <div>
      {/* Normal react-hook-form with useForm and useFieldArray*/}
      {/*<ComponentA />*/}

      {/*<ComponentC />*/}

      {/* Normal react-hook-form with useForm and useFieldArray + zod*/}
      <ComponentB />

      <br />
      <br />
      <br />
      <br />

      <ComponentD />
    </div>
  );
}

export default App;
