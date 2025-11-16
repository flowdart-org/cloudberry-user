"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { MEDIA_SERVICES } from "@/api/media/media.service";
import { useAuthStore } from "@/store/useAuthStore";

interface TryOnImageUploadProps {
  showLabel?: boolean;
  className?: string;
}

const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return resolve(null);

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.95);
  });
};

const TryOnImageUpload = ({ showLabel = true, className = "" }: TryOnImageUploadProps) => {
  const { user, setTryOnImage } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState("");
  const [crop, setCrop] = useState<Crop>({ unit: "%", width: 60, height: 80, x: 20, y: 10 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFile(file);
      setImageToCrop(reader.result as string);
      setIsCropDialogOpen(true);
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!imgRef.current || !completedCrop || !selectedFile) return;

    const croppedBlob = await getCroppedImg(imgRef.current, completedCrop);
    if (!croppedBlob) return;

    try {
      setIsUploading(true);

      const fileToUpload = new File([croppedBlob], selectedFile.name, { type: selectedFile.type });

      // Get upload URL
      const { data, error } = await MEDIA_SERVICES.getUserTryOnUploadUrl(fileToUpload);

      if (error || !data) throw new Error("Upload URL failed");

      // Upload image using PUT
      await MEDIA_SERVICES.uploadImage(data, fileToUpload);


      setTryOnImage(data);

      toast.success("Profile try-on image updated!");

      setIsCropDialogOpen(false);
      setImageToCrop("");
      setCompletedCrop(null);
      setSelectedFile(null);
    } catch (err) {
      toast.error("Failed to upload image");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setTryOnImage("");
  };

  return (
    <div className={className}>
      {showLabel && <h3 className="text-sm font-semibold mb-3">YOUR TRY-ON IMAGE</h3>}

      {/* PREVIEW AREA */}
      {user?.tryOnImage ? (
        <div className="relative group">
          <img
            src={user.tryOnImage}
            className="rounded-lg object-cover aspect-[3/4] w-full"
          />
          <button
            className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition"
            onClick={handleRemove}
          >
            <X size={16} />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition"
          >
            <Upload className="text-white w-6 h-6" />
            <span className="ml-2 text-white font-medium">Replace</span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="aspect-[3/4] bg-muted border-2 border-dashed rounded-lg flex flex-col justify-center items-center hover:border-primary/60 transition"
        >
          <Upload className="text-muted-foreground w-10 h-10 mb-2" />
          Upload Your Try-On Image
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Crop Modal */}
      <Dialog open={isCropDialogOpen} onOpenChange={(open) => !isUploading && setIsCropDialogOpen(open)}>
        <DialogContent className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adjust Image</DialogTitle>
          </DialogHeader>

          {imageToCrop && (
            <ReactCrop
              crop={crop}
              onChange={setCrop}
              onComplete={(crop) => setCompletedCrop(crop)}
              aspect={3 / 4}
            >
              <img ref={imgRef} src={imageToCrop} className="max-h-[400px]" />
            </ReactCrop>
          )}

          <DialogFooter>
            <Button
              variant="secondary"
              disabled={isUploading}
              onClick={() => {
                setIsCropDialogOpen(false);
                setCompletedCrop(null);
                setImageToCrop("");
                setSelectedFile(null);
              }}
            >
              Cancel
            </Button>

            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Save"}
              {isUploading ? "Uploading..." : ""}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TryOnImageUpload;
