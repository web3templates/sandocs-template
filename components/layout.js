import React from "react";
import Navbar from "@components/navbar";
import Sidebar from "@components/sidebar";
import Aside from "./aside";

export default function Layout(props) {
  return (
    <>
      <Navbar sidebar={props.sidebar} active={props.active} />
      <div className="flex flex-col md:flex-row">
        <Sidebar items={props.sidebar} active={props.active} />
        <div className="flex-1 max-w-3xl mx-auto w-full">
          {props.children}
        </div>
        <Aside items={props.toc} />
      </div>
    </>
  );
}
