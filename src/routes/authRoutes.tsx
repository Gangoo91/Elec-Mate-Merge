
import { Route } from "react-router-dom";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";

/**
 * Authentication-related routes
 */
export const authRoutes = (
  <>
    <Route path="/auth/signin" element={<SignIn />} />
    <Route path="/auth/signup" element={<SignUp />} />
  </>
);
