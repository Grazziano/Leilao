import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"

import Header from './Header'
import Leilao from './Leilao'
import Detalhes from './Detalhes'

function App() {
  return (
    <Router>
      <Header/>
        <Route path="/" exact component={Leilao} />
        <Route path="/detalhes/:id" component={Detalhes} />
    </Router>
  );
}

export default App;
