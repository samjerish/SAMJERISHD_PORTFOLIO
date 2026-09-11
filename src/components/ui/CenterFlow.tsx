import React from "react";
import { TechStackSection } from "../sections/TechStackSection";

export interface TechItem {
  id?: string;
  name: string;
  icon?: string;
  url?: string;
  color?: string;
  category?: string;
}

export const CenterFlow: React.FC<{
  items?: TechItem[];
  title?: string;
  subtitle?: string;
}> = () => {
  return <TechStackSection />;
};
