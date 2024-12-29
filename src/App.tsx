import React from 'react';
import './App.css';
import { ComponentA } from './components/ComponentA';
import { ComponentB } from './components/ComponentB';
import { ComponentC } from './components/ComponentC';

function App() {
  return (
    <div>
      {/* Normal react-hook-form with useForm and useFieldArray*/}
      {/*<ComponentA />*/}

      <ComponentC />

      {/* Normal react-hook-form with useForm and useFieldArray + zod*/}
      {/*<ComponentB />*/}
    </div>
  );
}

export default App;
