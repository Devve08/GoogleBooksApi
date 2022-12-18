import React from "react";

export default function InputContainer({
  label,
  placeholder,
  value,
  handleOnChange,
  onClick,
}) {
  return (
    <div className="w-full flex flex-col p-6 items-center justify-center">
      {label && <label>{label}</label>}

      <input
        className="py-2 px-4 border rounded outline-none"
        onChange={e => handleOnChange(e)}
        value={value}
        type="text"
        placeholder={placeholder}
      />
      <button onClick={onClick} className="bg-white font-bold bg-black  text-white py-2 px-6 rounded mt-4">
        Search
      </button>
    </div>
  );
}
