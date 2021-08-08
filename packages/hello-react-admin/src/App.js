import { createHashHistory } from "history";
import jsonServerProvider from "ra-data-json-server";
import * as React from "react";
import { Admin, Resource, EditGuesser } from "react-admin";
import { PostList, PostEdit, PostCreate } from "./posts";
import { UserList } from "./users";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import Dashboard from "./Dashboard";
import authProvider from "./authProvider";

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
      dashboard={Dashboard}
      authProvider={authProvider}
    >
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
      />
      <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
  );
};

export default App;
