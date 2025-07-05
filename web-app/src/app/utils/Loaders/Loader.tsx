import React from "react";
import "./loader.css";
interface loaderProps {
  bgColor?: string,
  width?: string,
  padding?: string,
  display?: string,
}
const Loader: React.FC<loaderProps> = ({ bgColor = "--primary-green", width, padding, display }) => {
  return (
    <div className="loader" style={{
      backgroundColor: `var(${bgColor})`,
      width: width,
      padding: padding,
      display: display
    }}>

    </div>
  )
}

export default Loader
