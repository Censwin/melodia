import React, {useEffect} from 'react'
import { Provider } from 'react-redux'
import { GlobalStyle } from  './style'
import { renderRoutes } from 'react-router-config'
import { IconStyle } from './assets/iconfont/iconfont'
import store from './store/index'
import routes from './routes/index.js'
import { HashRouter } from 'react-router-dom';
import { Data } from './application/Singers/data';

function App() {
  useEffect(() => {
    const target = document.getElementById('root')
    if (target) {
      target.addEventListener("click", function(){
        const audio = document.getElementById("__audio")
        console.log(audio)
        if (audio) {
          audio.play()
          audio.pause()
        }
      });
      setTimeout(() => {
        target.removeEventListener("click", function(){});
      }, 1);
    }
  }, [])
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>
          { renderRoutes(routes) }
        </Data>
      </HashRouter>
    </Provider>
  )
}

export default App;

/* 
renderRoutes 源码
import React from "react";
import Switch from "react-router/Switch";
import Route from "react-router/Route";
const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
routes ? (
    <Switch {...switchProps}>
        {routes.map((route, i) => ( 
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => (
            <route.component {...props} {...extraProps} route={route} />
          )}
        />
      ))}
    </Switch>
  ) : null;
 export default renderRoutes;
*/