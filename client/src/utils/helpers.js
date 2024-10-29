export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const getEmptyCardMessage = (filterType) => {
  switch (filterType) {
    case "search":
      return "No stories found matching your search";
    case "date":
      return "No stories found in the selected date range";
    default:
      return "No travel stories yet. Click the + button to add your first story!";
  }
};

// export const getEmptyCardImg = (filterType) => {
//   switch(filterType){
//     case "search":
//       return NO_SEARCH_DATA_IMG;

//     case "date":
//       return NO_FILTER_DATA_IMG;

//     default:
//       return ADD_STORY_IMG;  
//   }
// }