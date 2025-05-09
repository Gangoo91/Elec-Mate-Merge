
import { Route } from "react-router-dom";
import { Fragment } from "react";
import LandingPage from "@/pages/LandingPage";
import Index from "@/pages/Index";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";

const PublicRoutes = () => {
  return (
    <Fragment>
      <Route path="/" element={<LandingPage />} />
      <Route path="/index" element={<Index />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
    </Fragment>
  );
};

export default PublicRoutes;
