import type React from "react";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="mx-auto w-full">{children}</div>;

export default PageContainer;
