import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import axiosIntance from "../../utils/axiosInstance";
import TraveTracksCard from "../../Components/Cards/TraveTracksCard";
import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditTravelStory from "../Home/AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../../Components/Cards/EmptyCard";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import FilterInfoTitle from "../../Components/Cards/FilterInfoTitle";
import { getEmptyCardMessage } from "../../utils/helpers";

const Home = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState("");
  const [allTracks, setAllTracks] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });
  const [error, setError] = useState("");

  // get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosIntance.get("/get-user");
      const data = response.data;
      setUserInfo(data.user);
    } catch (error) {
      if (error.response.status === 401) {
        // Clear storage if unauthorized
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all travel stories
  const getAllStories = async () => {
    try {
      const response = await axiosIntance.get("/get-all-travel-tracks");
      const data = response.data;
      if (data && data.tracks) {
        setAllTracks(data.tracks);
      }
    } catch (error) {
      console.log("An unexpected error occured. please try again");
    }
  };

  // Handle Update Favourite
  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id;

    try {
      const response = await axiosIntance.put(
        "/update-is-favourite/" + storyId,
        {
          isFavourite: !storyData.isFavourite,
        }
      );

      const data = response.data;
      if (data && data.story) {
        toast.success(data.message);

        // recalling the story card after update
        if (filterType === "search" && searchQuery) {
          onSearchStory(searchQuery);
        } else if (filterType === "date") {
          filterStoriesByDate(dateRange);
        } else {
          getAllStories();
        }
      }
    } catch (error) {
      console.log("An unexpected error occured. please try again");
    }
  };

  // Delete Story
  const deleteTravelStory = async (storyData) => {
    const storyId = storyData._id;

    try {
      const response = await axiosIntance.delete(
        "/delete-travel-tracks/" + storyId
      );

      if (response.data && !response.data.error) {
        toast.error("Story Deleted Successfully");
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
        getAllStories();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again.");
      }
    }
  };

  // Search story
  const onSearchStory = async (query) => {
    try {
      const response = await axiosIntance.get("/search", {
        params: {
          query,
        },
      });

      if (response.data && !response.data.error) {
        setFilterType("search");
        setAllTracks(response.data.tracks);
      }
    } catch (error) {
      console.log("An unexpected error occured");
    }
  };

  const handleClearSearch = () => {
    setFilterType("");
    getAllStories();
  };

  // Handle Filter Travel Story By Date Range
  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day?.from ? moment(day.from).valueOf() : null;
      const endDate = day?.to ? moment(day.to).valueOf() : null;

      if (startDate && endDate) {
        const response = await axiosIntance.get("/travel-stories/filter", {
          params: { startDate, endDate },
        });

        if (response.data && response.data.stories) {
          setFilterType("date");
          setAllTracks(response.data.stories);
        }
      } else {
        // If no complete date range, show all stories
        setFilterType("");
        getAllStories();
      }
    } catch (error) {
      console.error("An unexpected error occurred while filtering:", error);
    }
  };

  // Handle Edit Story Click
  const handleEdit = async (data) => {
      setOpenAddEditModal({ isShown: true, type: "edit", data: data });
    };
  
  // Handle travel story Click
  const handleViewStory = async (data) => {
      setOpenViewModal({ isShown: true, data: data });
    };

  // Handle Date Range Select
  const handleDayClick = (day) => {
    setDateRange(day);
    filterStoriesByDate(day);
  };

  const resetFilter = () => {
    setDateRange({ from: null, to: null });
    setFilterType("");
    getAllStories();
  };

  useEffect(() => {
    getUserInfo();
    getAllStories();
  }, []);

  return (
    <>
     <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <FilterInfoTitle
          filterType={filterType}
          filterDates={dateRange}
          onClear={resetFilter}
        />

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
          {/* Main Content */}
          <div className="w-full lg:flex-1 order-2 lg:order-1">
            {allTracks && allTracks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 lg:mt-14">
                {allTracks.map((item) => (
                  <TraveTracksCard
                    key={item._id}
                    imgUrl={item.imageUrl}
                    title={item.title}
                    story={item.story}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavourite={item.isFavourite}
                    onEdit={() => handleEdit(item)}
                    onClick={() => handleViewStory(item)}
                    onFavouriteClick={() => updateIsFavourite(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 lg:mt-14">
                <EmptyCard 
                  imgSrc="" 
                  message={getEmptyCardMessage(filterType)} 
                />
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className="w-full lg:w-[350px] order-1 lg:order-2">
            <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg">
              <div className="p-3">
                <DayPicker
                  captionLayout="dropdown-buttons"
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  pagedNavigation
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Add & Edit Story Model*/}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          getAllTravelStories={getAllStories}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>

      {/* View Story Model */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <ViewTravelStory
          type={openViewModal.type}
          storyInfo={openViewModal.data || null}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
            handleEdit(openViewModal.data || null);
          }}
          onDeleteClick={() => {
            deleteTravelStory(openViewModal.data || null);
          }}
        />
      </Modal>

      <button
        className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-4 sm:right-10 bottom-4 sm:bottom-10 shadow-lg"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-2xl sm:text-[32px] text-white" />
      </button>
    </>
  );
};

export default Home;
