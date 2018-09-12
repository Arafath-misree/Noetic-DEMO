// Enable HMR
if (module.hot) module.hot.accept()

// Webpack entrypoint for styles
import './styles/index'

// Initialise React
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

ReactDOM.render(<App />, document.querySelector('.app'))
