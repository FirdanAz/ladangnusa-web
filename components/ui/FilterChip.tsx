"use client";

import { useState } from "react";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: string;
}

export function FilterChip({ label, active = false, onClick, icon }: FilterChipProps) {
  return (
    <span className={`filter-chip ${active ? "active" : ""}`} onClick={onClick}>
      {icon && <i className={`bi ${icon}`} />}
      {label}
    </span>
  );
}

interface FilterChipGroupProps {
  options: string[];
  defaultActive?: string;
  onChange?: (active: string) => void;
}

export function FilterChipGroup({ options, defaultActive, onChange }: FilterChipGroupProps) {
  const [active, setActive] = useState(defaultActive ?? options[0]);

  const handleClick = (opt: string) => {
    setActive(opt);
    onChange?.(opt);
  };

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map((opt) => (
        <FilterChip
          key={opt}
          label={opt}
          active={active === opt}
          onClick={() => handleClick(opt)}
        />
      ))}
    </div>
  );
}
