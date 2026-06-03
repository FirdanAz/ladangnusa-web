"use client";

import { create } from "zustand";

// Using a simple global state without zustand for minimal deps
// If you want zustand: npm install zustand

let listeners: Array<(open: boolean) => void> = [];
let sidebarOpen = false;

function setOpen(value: boolean) {
  sidebarOpen = value;
  listeners.forEach((fn) => fn(value));
}

import { useState, useEffect } from "react";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(sidebarOpen);

  useEffect(() => {
    const listener = (val: boolean) => setIsOpen(val);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return {
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen(!sidebarOpen),
  };
}
