import React from 'react';

class ReactVersion extends React.Component {
    render() {
      return <div>
        {
          process.env.NODE_ENV === 'development' ?
          <p className='version'>Built with React {React.version}</p> : null
        }
      </div>
    }
  }

  export default ReactVersion;