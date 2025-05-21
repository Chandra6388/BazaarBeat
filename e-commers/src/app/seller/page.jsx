'use client';
import React, {useState , useEffect} from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import uploadToCloudinary from "@/service/seller/UploadImg.service";
import { getAllCategory } from "@/service/admin/categoryService";




const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  console.log("categories", categories);
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const req = {}
    const res = await getAllCategory(req).then((res) => {
      if (res.status) {
        setCategories(res.data);
      }
      else {
        setCategories([]);
      }
    })
      .catch((err) => {
        console.log("error in getting category", err);
      });
  }

  const handleSubmit = async () => {
    if (!name || !description || !price || !offerPrice || files.length === 0) {
      alert("Please fill all required fields and upload at least one image.");
      return;
    }

    try {
      setLoading(true);

      // Upload images to Cloudinary
      const uploadedImageUrls = await Promise.all(
        files.map((file) => file ? uploadToCloudinary(file) : null)
      );

      const filteredUrls = uploadedImageUrls.filter(Boolean);

      const productData = {
        name,
        description,
        category,
        price,
        offerPrice,
        images: filteredUrls,
      };


      setFiles([]);
      setName('');
      setDescription('');
      setCategory('Earphone');
      setPrice('');
      setOfferPrice('');
    } catch (error) {
      console.error("Upload error", error);
      
    }
  };


  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                />
                <Image
                  className="max-w-24 cursor-pointer"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt="Upload"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>

        {/* Category, Price, Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">Category</label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {
                categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))
              }
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'ADD'}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
