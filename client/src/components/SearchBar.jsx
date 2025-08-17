 

import { useState } from "react"

export default function SearchBar({ onSearch, defaultValue = "" }) {
  const [q, setQ] = useState(defaultValue)

  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder-muted-foreground font-medium transition-all duration-200"
          placeholder="Buscar por código, nombre."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onSearch(q)}
        />
      </div>
      <button
        className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-xl font-heading font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
        onClick={() => onSearch(q)}
      >
        Buscar
      </button>
    </div>
  )
}
