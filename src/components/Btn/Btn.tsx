"use client";
import Loader from "../Loaders/Loader";
import styles from "./page.module.css"
interface BtnProps {
  text?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  bgColor?: string;
  width?: string;
  isDisable?: boolean;
  displayLoader?: boolean;
}
const Btn: React.FC<BtnProps> = ({ text = "Button", onClick, bgColor = "--primary-green", width, isDisable = false, displayLoader = false }) => {
  return (
    <button
      disabled={isDisable}
      onClick={onClick}
      className={styles.btn}
      style={{
        backgroundColor: `var(${bgColor})`,
        width: width,
        opacity: isDisable == true ? "0.5" : "1"
      }}

    >
      <Loader bgColor="--white" width="12px" padding="2px" display={displayLoader == true ? "" : "none"} />{text}
    </button>
  )
}

export default Btn
