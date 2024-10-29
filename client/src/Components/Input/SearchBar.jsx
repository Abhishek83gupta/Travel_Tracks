import React from 'react'
import { IoSearch } from "react-icons/io5"
import { MdOutlineClose } from "react-icons/md"

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search stories..."
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch()
          }
        }}
        className="w-full px-4 py-2 pl-10 pr-10 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
      />
      
      <IoSearch 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
      />
      
      {value && (
        <button
          onClick={onClearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <MdOutlineClose className="text-lg" />
        </button>
      )}
    </div>
  )
}

export default SearchBar