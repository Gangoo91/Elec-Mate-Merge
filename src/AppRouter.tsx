
import { Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import MainRoutes from "./routes/MainRoutes";
import ElectricianRoutes from "./routes/ElectricianRoutes";
import ApprenticeRoutes from "./routes/ApprenticeRoutes";

const AppRouter = () => {
  return (
    <Routes>
      <PublicRoutes />
      <MainRoutes />
      <ElectricianRoutes />
      <ApprenticeRoutes />
    </Routes>
  );
};

export default AppRouter;
