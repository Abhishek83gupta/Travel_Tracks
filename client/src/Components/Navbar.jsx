import React from 'react'
import ProfileInfo from './Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from './Input/SearchBar'
import LOGO from '../assets/images/logo.svg'

const Navbar = ({ 
  userInfo, 
  searchQuery, 
  setSearchQuery, 
  onSearchNote, 
  handleClearSearch 
}) => {
  const isToken = localStorage.getItem("token")
  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const handleSearch = () => {
    if(searchQuery) {
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch = () => {
    handleClearSearch()
    setSearchQuery("")
  }

  return (
    <div className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 sm:py-4 w-full">
          {/* Top row for mobile - Logo and Profile */}
          <div className="flex items-center justify-between sm:hidden">
            <img 
              src={LOGO} 
              alt="travel tracks" 
              className="h-8"
            />
            {isToken && (
              <ProfileInfo 
                userInfo={userInfo} 
                onLogout={onLogout}
              />
            )}
          </div>

          {/* Desktop layout */}
          <div className="hidden sm:flex sm:items-center sm:justify-between">
            <div className="flex-shrink-0 sm:order-1">
              <img 
                src={LOGO} 
                alt="travel tracks" 
                className="h-10"
              />
            </div>

            {isToken && (
              <>
                {/* Search Bar */}
                <div className="flex-1 max-w-3xl mx-8 sm:order-2">
                  <SearchBar
                    value={searchQuery}
                    onChange={({target}) => setSearchQuery(target.value)}
                    handleSearch={handleSearch}
                    onClearSearch={onClearSearch}
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-shrink-0 sm:order-3">
                  <ProfileInfo 
                    userInfo={userInfo} 
                    onLogout={onLogout}
                  />
                </div>
              </>
            )}
          </div>

          {/* Search Bar for mobile */}
          {isToken && (
            <div className="mt-3 sm:hidden">
              <SearchBar
                value={searchQuery}
                onChange={({target}) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar