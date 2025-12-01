import React from 'react';

interface OptionButtonProps {
  name: string;
  value: string;
  label: string;
  type?: 'radio' | 'checkbox';
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ name, value, label, type = "radio", checked, onChange }) => (
  <label className="h-full block">
    <input
      type={type}
      name={name}
      value={value}
      className="hidden peer"
      onChange={onChange}
      checked={checked}
    />
    <div className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer text-sm bg-white transition-all text-slate-500 hover:bg-slate-50 peer-checked:bg-emerald-50 peer-checked:border-emerald-500 peer-checked:text-emerald-800 peer-checked:font-semibold peer-checked:shadow-[0_0_0_1px_rgba(16,185,129,1)] h-full">
      {label}
    </div>
  </label>
);

export default OptionButton;