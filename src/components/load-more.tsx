import React from "react";
import { Spinner } from "./ui/spinner";

const LoadMore: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <Spinner color="#3490dc" />
      <span className="ml-2 text-gray-600">Loading data...</span>
    </div>
  );
};

export default LoadMore;
