
import { Navigate, useParams } from "react-router-dom";
import { supplierData } from "@/data/electrician/supplierData";

const categorySlugs = ["cables", "components", "protection", "accessories", "lighting", "tools"] as const;

const MaterialsSlugRedirect = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const lower = slug.toLowerCase();

  const supplierSlugs = Object.keys(supplierData);

  if (supplierSlugs.includes(lower)) {
    return <Navigate to={`/electrician/materials/supplier/${lower}`} replace />;
  }
  if (categorySlugs.includes(lower as any)) {
    return <Navigate to={`/electrician/materials/category/${lower}`} replace />;
  }
  return <Navigate to="/electrician/materials" replace />;
};

export default MaterialsSlugRedirect;
