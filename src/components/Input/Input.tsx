"use client"
import React from 'react';
import styles from './page.module.css';

interface InpProps {
  h3: string;
  inpType?: React.HTMLInputTypeAttribute;
  inpName?: string;
  inpId?: string;
  inpPlaceholder?: string;
  inpOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inpValue?: string | number | readonly string[]
}

const Input: React.FC<InpProps> = ({
  h3 = "Text",
  inpType = "text",
  inpName = "name",
  inpId = "inpId",
  inpPlaceholder = 'Enter text here',
  inpOnChange,
  inpValue
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
      />
    </div>
  );
};

export default Input;