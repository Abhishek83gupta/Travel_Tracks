import React from 'react'
import { FaHeart } from "react-icons/fa6"
import { GrMapLocation } from "react-icons/gr"
import moment from "moment/moment"

const TraveTracksCard = ({ 
  imgUrl, 
  title, 
  story, 
  date,
  visitedLocation,
  isFavourite,
  onEdit,
  onClick,
  onFavouriteClick 
}) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-300 relative">
      {/* Image */}
      <div className="relative h-48 sm:h-56 md:h-64">
        <img 
          src={imgUrl} 
          alt={title}
          className="w-full h-full object-cover"
          onClick={onClick}
        />
        
        {/* Favourite Button */}
        <button
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-full border border-white/30"
          onClick={onFavouriteClick}
        >
          <FaHeart className={`text-xl ${isFavourite ? "text-red-500" : "text-white"}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4" onClick={onClick}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {date ? moment(date).format("Do MMM YYYY") : "-"}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600 line-clamp-2">{story}</p>

        {visitedLocation && visitedLocation.length > 0 && (
          <div className="mt-4 flex items-center gap-2 text-sm text-cyan-600">
            <GrMapLocation className="flex-shrink-0" />
            <span className="line-clamp-1">{visitedLocation.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TraveTracksCard