import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { Content } from "@/components/layout/Content";

const Index: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden font-medium pb-[53px]">
      <div className="w-full max-md:max-w-full">
        <Hero title="Tarkeeb" />
        <Navbar />
        <Content
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius faucibus massa sollicitudin amet augue. Nibh metus a semper purus mauris duis. Lorem eu neque, tristique quis duis. Nibh scelerisque ac adipiscing velit non nulla in amet pellentesque."
        />
      </div>
    </div>
  );
};

export default Index;