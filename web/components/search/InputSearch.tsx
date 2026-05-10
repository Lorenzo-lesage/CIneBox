"use client";

// UI
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// Icons
import { Search } from "lucide-react";

// Types
import { InputSearchProps } from "@/types/search";

export function InputSearch({ query, setQuery }: InputSearchProps) {
  return (
    <Field className="relative group">
      <FieldLabel htmlFor="search-input" className="sr-only">
        Cerca
      </FieldLabel>
      <ButtonGroup>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for..."
            className="pl-10 rounded-lg"
          />
        </div>
      </ButtonGroup>
    </Field>
  );
}
