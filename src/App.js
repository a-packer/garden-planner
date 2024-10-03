import React, {useState} from 'react';
import {PageHeader, PageBody} from './components'

function App() {

  const [currentPage, setCurrentPage] = useState('guideChart')
  const [frostDate, setFrostDate] = useState('05/01')

  return (
    <div className="appBody"> 
      <PageHeader 
        setCurrentPage={setCurrentPage} 
        setFrostDate={setFrostDate}
        frostDate={frostDate} 
      />
      <PageBody 
        currentPage={currentPage} 
        frostDate={frostDate}
      />  
    </div>
  );
}

export default App;
