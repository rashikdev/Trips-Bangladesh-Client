import { useState } from "react";
import { getCloudinaryImgUrl } from "../../utils/utils";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddPackage = () => {
  const axiosSecure = useAxiosSecure();
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [gallaryUrls, setGallaryUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    try {
      setIsLoading(true);
      const url = await getCloudinaryImgUrl(file);
      setThumbnailUrl(url);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGallaryUpload = async (e) => {
    setIsLoading(true);
    const files = e.target.files;
    const uploadPromises = Array.from(files).map((file) =>
      getCloudinaryImgUrl(file)
    );
    try {
      const urls = await Promise.all(uploadPromises);
      setGallaryUrls(urls);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const price = form.price.value;
    const tourType = form.tourType.value;
    const description = form.description.value;

    const tourData = {
      title,
      price,
      tourType,
      description,
      thumbnail: thumbnailUrl,
      images: gallaryUrls,
    };
    if (isLoading) {
      return toast.error("Please wait, image is uploading...");
    }
    // send tour data to the server
    axiosSecure
      .post("/package", tourData)
      .then((res) => {
        if (res.data.insertedId) {
          console.log(res.data);
          Swal.fire({
            icon: "success",
            title: "Package added successfully!",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            toast: true,
          });
          form.reset();
          setThumbnailUrl(null);
          setGallaryUrls([]);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed to add package!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
        });
        console.log(err);
      });
  };

  return (
    <section className="max-w-4xl mx-auto py-10 px-4 md:px-0 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Add New Tour Package
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20 shadow-lg"
      >
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Tour Title</label>
          <input
            type="text"
            name="title"
            className="w-full p-3 rounded bg-white/20 text-white border border-white/30"
            required
          />
        </div>

        {/* Thumbnail Image */}
        <div>
          <label className="block mb-1 font-medium">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            name="thumbnail"
            onChange={handleThumbnailUpload}
            className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white file:text-white file:bg-secondary file:border-none file:px-4 file:py-1 file:rounded file:cursor-pointer focus:outline-none"
            required
          />
        </div>

        {/* Gallery Images */}
        <div>
          <label className="block mb-1 font-medium">Gallery Image</label>
          <input
            type="file"
            multiple
            name="images"
            accept="image/*"
            onChange={handleGallaryUpload}
            className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white file:text-white file:bg-secondary file:border-none file:px-4 file:py-1 file:rounded file:cursor-pointer focus:outline-none"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">
            Price <span className="text-sm">( BDT )</span>
          </label>
          <input
            type="number"
            name="price"
            className="w-full p-3 rounded bg-white/20 text-white border border-white/30"
            required
          />
        </div>

        {/* Tour Type */}
        <div>
          <label className="block mb-1 font-medium">Tour Type</label>
          <input
            type="text"
            name="tourType"
            className="w-full p-3 rounded bg-white/20 text-white border border-white/30"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full p-3 rounded bg-white/20 text-white border border-white/30"
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-primary hover:bg-orange-600 text-white font-semibold rounded-lg transition"
        >
          Add Package
        </button>
      </form>
    </section>
  );
};

export default AddPackage;
