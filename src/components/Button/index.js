import React from "react";
import "./styles.css";

export default function Button({ texto, classe  }) {
  return (
    <input
      type="submit"
      className={`botao ${classe}`}
      value={texto}
    />
  );
}
