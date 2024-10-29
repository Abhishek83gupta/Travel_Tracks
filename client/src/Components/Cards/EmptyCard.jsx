import React from 'react'

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-lg border border-gray-200">
      {imgSrc && (
        <img 
          src={imgSrc} 
          alt="empty state" 
          className="w-32 md:w-40 h-auto mb-4"
        />
      )}
      <p className="text-center text-sm md:text-base text-gray-600">
        {message}
      </p>
    </div>
  )
}

export default EmptyCard