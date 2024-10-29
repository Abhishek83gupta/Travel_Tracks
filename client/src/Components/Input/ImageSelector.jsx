import React, { useEffect, useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa"; 
import { MdDeleteOutline } from "react-icons/md"; 

const ImageSelector = ({ image, setImage, handleDeleteImg }) => {
  const inputRef = useRef(null); // Ref to the hidden file input
  const [previewUrl, setPreviewUrl] = useState(null); //  for holding the preview image URL

  // Handles when a new file is selected from the input
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file selected
    if (file) {
      setImage(file);
    }
  };

  // Triggers file input when the "Browse" button is clicked
  const onChooseFile = () => {
    inputRef.current.click(); // Open the hidden file input
  };

  // Handles removal of the currently selected image
  const handleRemoveImage = () => {
    setImage(null); // Clear the selected image in the parent component
    handleDeleteImg(); // Trigger any additional delete logic from the parent
  };

  // to update the preview URL whenever the `image` changes
  useEffect(() => {
    if (typeof image === "string") {
      // If `image` is a URL, set it directly as the preview URL
      setPreviewUrl(image);
    } else if (image) {
      // If `image` is a file, create a temporary preview URL for it
      const preview = URL.createObjectURL(image);
      setPreviewUrl(preview);
    } else {
      // If there's no image, clear the preview URL
      setPreviewUrl(null);
    }

    // Cleanup the dynamically created preview URL when the component unmounts
    return () => {
      if (previewUrl && typeof image !== "string") {
        URL.revokeObjectURL(previewUrl); // Revoke object URLs created by the browser
      }
    };
  }, [image]);

  return (
    <div>
      {/* Hidden file input for selecting images */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef} // Assign ref to input for programmatic access
        onChange={handleImageChange} // Handle file selection
        className="hidden" // Hidden from view
      />

      {/* If no image is selected, show a button to browse */}
      {!image ? (
        <button
          className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
          onClick={onChooseFile} // Trigger file input when clicked
        >
          <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100">
            <FaRegFileImage className="text-xl text-cyan-500" />
          </div>
          <p className="text-sm text-slate-500">Browse image files to upload</p>
        </button>
      ) : (
        // If an image is selected, show the preview and a delete button
        <div className="relative">
          <img
            src={previewUrl} // Preview the selected image or URL
            alt="Selected"
            className="w-full h-[300px] object-cover rounded-lg"
          />

          {/* Button to remove the selected image */}
          <button
            className="btn-small btn-delete absolute top-2 right-2"
            onClick={handleRemoveImage} 
          >
            <MdDeleteOutline className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector