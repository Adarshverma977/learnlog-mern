import AppRoutes from "./routes/AppRoutes";

import {
  Toaster,
} from "react-hot-toast";


function App() {

  return (

    <>

      <Toaster
        position="top-right"
        toastOptions={{

          style: {
            background:
              "#0f172a",

            color:
              "#fff",

            border:
              "1px solid rgba(255,255,255,0.1)",

            padding:
              "16px",

            borderRadius:
              "18px",
          },

          success: {
            iconTheme: {
              primary:
                "#6366f1",

              secondary:
                "#fff",
            },
          },

        }}
      />

      <AppRoutes />

    </>

  );

}

export default App;
