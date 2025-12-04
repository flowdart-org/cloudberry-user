import React, { useState, useRef, ChangeEvent } from "react";
import { X } from "lucide-react";
import { StaticImageData } from "next/image";
import { api } from "@/lib/axios";

interface TryOnModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  image: string | StaticImageData; // hardcoded ProductDTO image
}

const TryOnModal: React.FC<TryOnModalProps> = ({ isOpen, setOpen, image }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const hardcodedImage =
    typeof image === "string" ? image : (image as StaticImageData).src;

  if (!isOpen) return null;

  /** Converts File → base64 string (without data:image/... prefix) */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  /** Converts remote image URL → base64 string */
  const urlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(blob);
    });
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setUploadedImage(URL.createObjectURL(file));
  };

  const handleGenerate = async () => {
    if (!imageFile) {
      alert("Please upload an image first.");
      return;
    }

    try {
      setLoading(true);

      // Convert both images to base64
      const personBase64 = await fileToBase64(imageFile);
      const productBase64 = await urlToBase64(hardcodedImage);

      // Build the request payload
      const payload = {
        personImage: {
          image: {
            bytesBase64Encoded: personBase64,
          },
        },
        productImages: [
          {
            image: {
              bytesBase64Encoded: productBase64,
            },
          },
        ],
      };

      const res = await api.post("/api/ai/try-on", payload);

      console.log("Generated Result:", res.data);
      alert("Image generation request sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">AI Try-On</h2>

        {/* Upload Section */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-gray-400 transition"
        >
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
          ) : (
            <p className="text-gray-500">Click to upload your image</p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>

        {/* Hardcoded Image */}
        <div className="mt-4">
          <p className="text-gray-700 text-sm mb-2">ProductDTO Image:</p>
          <img
            src={hardcodedImage}
            alt="Hardcoded"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default TryOnModal;
