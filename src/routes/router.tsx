import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FullLayout from "../layouts/fulllayout";

//Layout
import Home from "../views/Home";

// import Page1 from "@/views/Page1";
// import Page2 from "@/views/Page2";
// import PageNotFound from "@/views/PageNotFound";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <FullLayout>
              <Home />
            </FullLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
