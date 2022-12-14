import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import { IRouteItem } from './type';

interface IRouteProps extends RouteProps {
  routes: IRouteItem[]
}

const RenderRoute:React.FC<IRouteProps> = (props) => {
  const routes = props.routes;
  return (
    <Switch>
      {
        routes.map((item: IRouteItem, index: number) => {
          const Component = item.component;
          return (
            <Route path={item.path} key={item.path}
              exact={item.exact}
              render={(prop) => (
                <Suspense fallback={<div>loading...</div>}>
                  <Component innerRoutes={item.routes} key={String(index)} {...prop} />
                </Suspense>
              )} />
          )
        })
      }
    </Switch>
  )
}


export default RenderRoute;
