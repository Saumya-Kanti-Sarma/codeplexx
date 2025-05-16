import styles from "./page.module.css"
interface BtnProps {
  text: String;
  onClick: () => void;
  bgColor: String;

}
const Btn: React.FC<BtnProps> = ({ text = "Button", onClick, bgColor = "--primary-green" }) => {
  return (
    <button onClick={onClick} className={styles.btn}
      style={{
        backgroundColor: `var(${bgColor})`
      }}
    >
      {text}
    </button>
  )
}

export default Btn
