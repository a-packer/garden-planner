import React, {useState} from 'react';
import {TableHeader, PageHeader, PageBody} from './components'

function App() {

  const [currentPage, setCurrentPage] = useState('guideChart')

  return (
    <div className="appBody"> 
      <PageHeader setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      <TableHeader /> 
      <PageBody currentPage={currentPage}/>  
    </div>
  );
}

export default App;
