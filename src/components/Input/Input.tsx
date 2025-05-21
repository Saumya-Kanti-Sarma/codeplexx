"use client"
import React from 'react';
import styles from './page.module.css';

interface InpProps {
  h3?: string;
  inpType?: React.HTMLInputTypeAttribute;
  inpName?: string;
  inpId?: string;
  inpPlaceholder?: string;
  inpHeight?: string;
  inpTextAlign?: React.CSSProperties['textAlign'];
  inpOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inpValue?: string | number | readonly string[],
  required?: boolean
}

const Input: React.FC<InpProps> = ({
  h3 = "Text",
  inpType = "text",
  inpName = "name",
  inpId = "inpId",
  inpPlaceholder = 'Enter text here',
  inpOnChange,
  inpHeight,
  inpTextAlign = "start",
  inpValue,
  required = false,
}) => {
  return (
    <div className={styles.div}>
      <h3 className={styles.h3}>{h3}</h3>
      <input
        type={inpType}
        name={inpName}
        id={inpId}
        placeholder={inpPlaceholder}
        className={styles.input}
        onChange={inpOnChange}
        value={inpValue}
        required={required}
        style={{
          height: inpHeight,
          textAlign: inpTextAlign,
        }}
      />
    </div>
  );
};

export default Input;