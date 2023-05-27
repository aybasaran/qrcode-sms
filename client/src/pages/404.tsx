import React, { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-8">
      <h1 className="text-2xl">404</h1>
      <p className="text-lg">Page not found</p>
    </div>
  );
};

export default NotFoundPage;
