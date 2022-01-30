import React from 'react';
import Routing from './Routing';
import BopttomMenuBar from './core/BopttomMenuBar';
import MenuBar from './core/MenuBar';

const App = () => {
  return (
    <React.Fragment>
      <MenuBar />
      <Routing />
      <BopttomMenuBar />
    </React.Fragment>
  );
};

export default App;
