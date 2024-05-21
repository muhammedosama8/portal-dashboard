import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";

/// Pages
import Error404 from "./common/Error404";

//Scroll To Top
import ScrollToTop from "./layouts/ScrollToTop";

import Admins from "./pages/Admin";
import AddAdmin from "./pages/Admin/AddAdmin";
import Permission from "./pages/CustomRules";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Assets from "./pages/Assets";
import Payment from "./pages/Payment";
import Deduction from "./pages/Deduction";
import PaymentLink from "./pages/PaymentLink";
import Financial from "./pages/Financial";
import Leads from "./pages/Leads";

const Markup = () => {
  const allroutes = [
    // Admins
    { url: "/", component: <Admins /> },
    { url: "add-admins", component: <AddAdmin /> },
    { url: "edit-admin/:id/:name", component: <AddAdmin /> },

    // Rules
    { url: "rules", component: <Permission /> },
    { url: "rules/:id", component: <Permission /> },

    // Assets
    { url: "custody", component: <Assets /> },

    // Financial
    { url: "financial", component: <Financial /> },

    // Employees
    { url: "employees", component: <Employees /> },

    //Payment Link
    { url: "payment-link", component: <PaymentLink /> },

    // Projects
    { url: "projects", component: <Projects /> },

    // Leads
    { url: "leads", component: <Leads /> },

    // Departments
    { url: "departments", component: <Departments /> },

    // Deduction
    { url: "deduction", component: <Deduction /> },
    
    // Payment
    { url: "payment", component: <Payment /> },

    //Profile
    { url: "profile", component: <Profile /> },

    // Error
    { url: "*", component: <Error404 /> },
  ];

  return (
    <>
      <Routes>
        <Route path="page-error-404" element={<Error404 />} />
        <Route element={<MainLayout />}>
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
};

function MainLayout() {
  return (
    <div id="main-wrapper" className={`show `}>
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: window.screen.height - 45 }}
      >
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Markup;
