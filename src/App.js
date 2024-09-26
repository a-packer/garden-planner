import React, {useState} from 'react';
import {PageHeader, PageBody} from './components'

function App() {

  const [currentPage, setCurrentPage] = useState('guideChart')

  return (
    <div className="appBody"> 
      <PageHeader setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      <PageBody currentPage={currentPage}/>  
    </div>
  );
}

export default App;
