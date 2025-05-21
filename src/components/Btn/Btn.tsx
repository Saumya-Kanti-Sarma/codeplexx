"use client";
import styles from "./page.module.css"
interface BtnProps {
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  bgColor?: string;
  width?: string

}
const Btn: React.FC<BtnProps> = ({ text = "Button", onClick, bgColor = "--primary-green", width }) => {
  return (
    <button
      onClick={onClick}
      className={styles.btn}
      style={{
        backgroundColor: `var(${bgColor})`,
        width: width
      }}

    >
      {text}
    </button>
  )
}

export default Btn
