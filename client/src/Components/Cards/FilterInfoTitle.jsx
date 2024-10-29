import React from "react";
import moment from "moment";
import { MdOutlineClose } from "react-icons/md";

const FilterInfoTitle = ({ filterType, filterDates, onClear }) => {
  const DateRangeChip = ({ date }) => {
    if (!date?.from || !date?.to) return null;

    const startDate = moment(date.from).format("Do MMM YYYY");
    const endDate = moment(date.to).format("Do MMM YYYY");
    
    return (
      <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
        <span className="text-sm font-medium text-gray-900">
          {startDate} - {endDate}
        </span>
        <button 
          onClick={onClear}
          className="text-gray-500 hover:text-gray-700"
        >
          <MdOutlineClose className="w-4 h-4" />
        </button>
      </div>
    );
  };

  if (!filterType) return null;

  return (
    <div className="mb-6 md:mb-8">
      {filterType === "search" ? (
        <h3 className="text-lg md:text-xl font-medium text-gray-900">
          Search Results
        </h3>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg md:text-xl font-medium text-gray-900">
            Travel Stories from
          </h3>
          <DateRangeChip date={filterDates} />
        </div>
      )}
    </div>
  );
};

export default FilterInfoTitle;