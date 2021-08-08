import { createHashHistory } from "history";
import jsonServerProvider from "ra-data-json-server";
import * as React from "react";
import { Admin, Resource } from "react-admin";
import { PostList } from "./posts";
import { UserList } from "./users";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = ({ hashPrefix = "" }) => {
  const history = React.useMemo(() => {
    return createHashHistory({
      basename: hashPrefix,
    });
  }, [hashPrefix]);
  return (
    <Admin
      disableTelemetry={true}
      dataProvider={dataProvider}
      history={history}
    >
      <Resource name="posts" list={PostList} />
      <Resource name="users" list={UserList} />
    </Admin>
  );
};

export default App;
