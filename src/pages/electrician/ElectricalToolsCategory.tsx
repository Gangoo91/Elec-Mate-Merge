import { useParams, Navigate } from "react-router-dom";
import EnhancedToolCategoryDisplay from "@/components/electrician-tools/EnhancedToolCategoryDisplay";

const ElectricalToolsCategory = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  if (!categoryName) {
    return <Navigate to="/electrician/tools" replace />;
  }
  
  // Decode the category name from URL
  const decodedCategoryName = decodeURIComponent(categoryName);
  
  return <EnhancedToolCategoryDisplay categoryName={decodedCategoryName} />;
};

export default ElectricalToolsCategory;
