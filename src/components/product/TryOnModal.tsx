import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Sparkles, Download, X } from "lucide-react";
import { toast } from "sonner";
import { TRYON_SERVICES } from "@/api/tryon/tryon.service";
import TryOnImageUpload from "./TryonImageUpload";
import { ProductDTO } from "@/types/product.types";

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDTO;
}

const TryOnModal = ({ isOpen, onClose, product }: TryOnModalProps) => {
  const { user, decrementTryOnCount } = useAuthStore();

  // Hooks must always run
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  if (!user || !product) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-6 text-center">
          <p className="text-neutral-400 ">No user or product found.</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </DialogContent>
      </Dialog>
    );
  }

  const handleGenerate = async () => {
    if (!user.tryOnImage) return toast.error("Upload your photo first");
    if (user?.tryOnLimit <= 0) return toast.error("Try-on limit reached");

    setIsGenerating(true);

    try {
      const {data} = await TRYON_SERVICES.generateTryOn(product.id);
      if (!data || data?.images.length <= 0) {
        toast.error("Failed to generate try-on");
        return;
      }

      setGeneratedImages(data.images);
      decrementTryOnCount();
      toast.success("Try-on generated!");
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `tryon-${product.id}-${index + 1}.png`;
    link.click();
    toast.success("Image downloaded");
  };

  const handleClose = () => {
    setGeneratedImages([]);
    onClose();
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 sm:rounded-none">
        
        {/* HEADER */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex justify-between z-40">
          <div>
            <h2 className="text-2xl font-bold">Virtual Try-On</h2>
            <p className="text-sm text-neutral-400 ">{product.name}</p>
          </div>
          <div className="text-right">
            <p className={`font-semibold text-sm`}>
              {/* {user.tier.toUpperCase()} TIER */}
            </p>
            <p className="text-xs text-neutral-400  flex items-center justify-center gap-2">
              {user.tryOnLimit} / 3 <Sparkles size={13} fill='' />
            </p>
          </div>
            <X onClick={handleClose} />
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {generatedImages.length === 0 ? (
            <>
              {/* Upload & Preview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="">
                  <h3 className="text-sm font-semibold mb-2">product IMAGE</h3>
                  <img src={product.thumbnail} className="w-full object-cover aspect-[3/4]" />
                </div>

                <TryOnImageUpload className=""/>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-2">Tips for best results:</h4>
                <ul className="text-xs text-neutral-400  space-y-1">
                  <li>• Use a well-lit, full-body photo</li>
                  <li>• Stand straight facing the camera</li>
                  <li>• Plain background works best</li>
                  <li>• Wear fitted clothing for accurate results</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {generatedImages.map((img, i) => (
                <div key={i} className="relative group aspect-[3/4]">
                  <img src={img} className="rounded-lg object-cover aspect-[3/4]" />
                  <button
                    onClick={() => handleDownload(img, i)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 bg-black/50 rounded text-white transition"
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0  px-6 py-4 bg-white">
          {generatedImages.length === 0 ? (
            <Button onClick={handleGenerate} disabled={isGenerating || !user.tryOnImage || user.tryOnLimit <= 0} className="w-full">
              {user.tryOnLimit <= 0 ? "Limit Exeeded" : isGenerating ? "Generating..." : "Generate Try-On"}
            </Button>
          ) : (
            <Button onClick={() => setGeneratedImages([])} className="w-full mt-4">
                Try Again
            </Button>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default TryOnModal;
