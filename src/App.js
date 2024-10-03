import React, {useState} from 'react';
import {PageHeader, PageBody} from './components'

function App() {

  const [currentPage, setCurrentPage] = useState('guideChart')
  const [frostDate, setFrostDate] = useState('05/01')

  return (
    <div className="appBody"> 
      <PageHeader setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      <PageBody 
        currentPage={currentPage} 
        frostDate={frostDate} 
        setFrostDate={setFrostDate}
      />  
    </div>
  );
}

export default App;
