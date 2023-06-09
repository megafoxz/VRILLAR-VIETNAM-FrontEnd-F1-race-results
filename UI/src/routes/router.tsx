import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FullLayout from "../layouts/fulllayout";

//Layout
import Home from "../views/Home";

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
