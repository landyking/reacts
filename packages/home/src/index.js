import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Switch, Route, Link } from "react-router-dom";
import "./index.css";

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

const menus = [
  {
    path: "/tic-tac-toe",
    title: "Tic Tac Toe",
    cmp: React.lazy(() => import("tic-tac-toe")),
  },
];

function Home() {
  return (
    <div className="center full-height">
      <div className="home">
        <h2>Component List</h2>
        <nav>
          <ul>
            {menus.map((e) => (
              <li key={e.path}>
                <Link to={e.path}>{e.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router history={history}>
      <React.Suspense
        fallback={<div className="center full-height">loading...</div>}
      >
        <Switch>
          {menus.map((e) => {
            const CMP = e.cmp;
            return (
              <Route key={e.path} path={e.path}>
                <CMP />
              </Route>
            );
          })}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </React.Suspense>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
