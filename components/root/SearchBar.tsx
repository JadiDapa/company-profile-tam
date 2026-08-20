"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RiSearchLine as Search } from "react-icons/ri";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search",
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "border-primary relative w-full border-b-2 lg:w-96",
        className,
      )}
    >
      <Search
        className="text-primary absolute top-1/2 left-4 -translate-y-1/2"
        size={20}
        strokeWidth={1.4}
      />
      <Input
        className="border-none ps-12 focus-visible:ring-0"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
