import React from 'react';
import ReactDOM from 'react-dom';

// Router
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Container Components
import { App, Home, Login, Register, Admin, ViewErrors, NewDrama, ReportError, Result, List } from 'containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="home" component={Home}/>
          <Route path="list" component={List} />
          <Route path="login" component={Login}/>
          <Route path="register" component={Register}/>
          <Route path="admin" component={Admin}/>
          <Route path="newdrama" component={NewDrama}/>
          <Route path="viewerrors" component={ViewErrors}/>
          <Route path="reporterror" component={ReportError}/>
          <Route path="result/:era" component={Result}/>
      </Route>
    </Router>
  </Provider>, rootElement
);
