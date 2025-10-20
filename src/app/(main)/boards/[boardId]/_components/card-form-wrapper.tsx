"use client";

import { ElementRef, useRef, useEffect } from "react";

interface CardFormWrapperProps {
  children: React.ReactNode;
  disableEditing: () => void;
}

export const CardFormWrapper = ({
  children,
  disableEditing,
}: CardFormWrapperProps) => {
  const formRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!formRef.current || formRef.current.contains(event.target as Node)) {
        return;
      }
      disableEditing();
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [disableEditing]);

  return <div ref={formRef}>{children}</div>;
};