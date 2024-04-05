import React from 'react';


function App() {
  const token= process.env.TOKEN
  return (
    <div className=''>
      Your token = {token}
    </div>
  );
}

export default App;
