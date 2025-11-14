import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useState, useRef } from "react";
import { Upload, Sparkles, Download } from "lucide-react";
import { toast } from "sonner";
import { TRYON_SERVICES } from "@/api/tryon/tryon.service";
import { Product } from "@/types/product.types";
import TryOnImageUpload from "./TryonImageUpload";

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const TryOnModal = ({ isOpen, onClose, product }: TryOnModalProps) => {
  const { user, setTryOnImage, decrementTryOnCount } = useAuthStore();

  // Hooks must always run
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user || !product) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-6 text-center">
          <p className="text-muted-foreground">No user or product found.</p>
          <Button onClick={onClose} className="mt-4">Close</Button>
        </DialogContent>
      </Dialog>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setTryOnImage(reader.result as string);
      toast.success("Try-on image uploaded successfully");
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!user.tryOnImage) return toast.error("Upload your photo first");
    if (user.tryOnCount <= 0) return toast.error("Try-on limit reached");

    setIsGenerating(true);

    try {
      const {data} = await TRYON_SERVICES.generateTryOn(product.id);
      console.log(data, 'its data')
      if (!data || data.length <= 0) {
        toast.error("Failed to generate try-on");
        return;
      }

      setGeneratedImages(data);
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

  const tierInfo = {
    free: { limit: 3, color: "text-muted-foreground" },
    pro: { limit: 10, color: "text-blue-500" },
    premium: { limit: "Unlimited", color: "text-purple-500" },
  }[user.tier ?? "free"];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        
        {/* HEADER */}
        <div className="sticky top-0 bg-background border-b px-6 py-4 flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">Virtual Try-On</h2>
            <p className="text-sm text-muted-foreground">{product.name}</p>
          </div>
          <div className="text-right">
            <p className={`font-semibold text-sm ${tierInfo.color}`}>
              {/* {user.tier.toUpperCase()} TIER */}
            </p>
            <p className="text-xs text-muted-foreground">
              {user.tryOnCount} / {tierInfo.limit} remaining
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {generatedImages.length === 0 ? (
            <>
              {/* Upload & Preview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold mb-2">PRODUCT IMAGE</h3>
                  <img src={product.thumbnail} className="w-full rounded-lg object-cover aspect-[3/4]" />
                </div>

                <TryOnImageUpload />
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-2">Tips for best results:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
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
                <div key={i} className="relative group">
                  <img src={img} className="rounded-lg object-cover aspect-[3/4]" />
                  <button
                    onClick={() => handleDownload(img, i)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 bg-black/50 rounded text-white transition"
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
              <Button variant="outline" onClick={() => setGeneratedImages([])} className="w-full mt-4">
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0  px-6 py-4 bg-white">
          {generatedImages.length === 0 ? (
            <Button onClick={handleGenerate} disabled={isGenerating || !user.tryOnImage} className="w-full">
              {isGenerating ? "Generating..." : "Generate Try-On"}
            </Button>
          ) : (
            <Button variant="outline" className="w-full" onClick={handleClose}>Close</Button>
          )}
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default TryOnModal;
