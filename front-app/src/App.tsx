import { RouterProvider } from "react-router-dom";
import { KeycloakProvider } from "./pages/shared/KeycloakProvider";
import router from "./router/Router";

function App() {
  return (
    <KeycloakProvider>
      <RouterProvider router={router}></RouterProvider>
    </KeycloakProvider>
  );
}

export default App;
