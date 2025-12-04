"use client"
import { useState } from "react";
import { Mail, Phone, Calendar, Edit2, Save, X, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { USER_SERVICES } from "@/api/user/user.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/hooks/useToast";
import TryOnImageUpload from "@/components/product/TryonImageUpload";
type VerificationStep = null | "email" | "phone";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState<VerificationStep>(null);
  const [otpCode, setOtpCode] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const { user, updateUser } = useAuthStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
  });

  const emailVerified = !!user?.email;
  const phoneVerified = !!user?.phone;

  const requestOTP = async (type: "email" | "phone") => {
    const value = type === "email" ? tempEmail : tempPhone;
    
    if (!value) {
      toast({
        title: "Error",
        description: `Please enter a ${type} address`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // const response = await USER_SERVICES.sendOtp({ type, value });
      const response = {message: "OTP sent successfully"}
      toast({
        title: "Success",
        description: response.message || `OTP sent to your ${type}`,
      });
      
      setVerificationStep(type);
      setOtpCode("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || `Failed to send OTP to ${type}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!verificationStep || otpCode.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    // const value = verificationStep === "email" ? tempEmail : tempPhone;

    setIsLoading(true);
    try {
      // const response = await USER_SERVICES.verifyOtp({
      //   type: verificationStep,
      //   value,
      //   code: otpCode,
      // });

      // updateUser(response.data);
      
      // setFormData((prev) => ({
      //   ...prev,
      //   [verificationStep]: value,
      // }));

      toast({
        title: "Success",
        description: `${verificationStep === "email" ? "Email" : "Phone"} verified successfully`,
      });

      setVerificationStep(null);
      setOtpCode("");
      setTempEmail("");
      setTempPhone("");
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.response?.data?.message || "Invalid OTP code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updateData = {
        name: formData.name,
        dob: new Date(formData.dob),
        gender: formData.gender,
      };

      const response = await USER_SERVICES.updateProfile(updateData);

      if(!response.success || !response?.data) {
        throw new Error(response.error || "Failed to update profile")
      }
      
      updateUser(response?.data);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message[0] || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelVerification = () => {
    setVerificationStep(null);
    setOtpCode("");
    setTempEmail("");
    setTempPhone("");
  };

  return (
    <div className="space-y-6  max-w-4xl mx-auto">
      <Card className="border-border">
              <CardHeader>
                <CardTitle>Virtual Try-On Image</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-400  mb-4">
                  Upload your photo once and use it for all virtual try-ons across the platform
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <TryOnImageUpload showLabel={false} />
                  </div>
                  <div className="flex flex-col justify-center space-y-3">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="text-sm font-semibold mb-2">Tips for best results:</h4>
                      <ul className="text-xs text-neutral-400  space-y-1">
                        <li>• Use a well-lit, full-body photo</li>
                        <li>• Stand straight facing the camera</li>
                        <li>• Plain background works best</li>
                        <li>• Wear fitted clothing for accurate results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
      <Card className="border-border">
        <CardHeader className="space-y-1 pb-8">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-md md:text-lg lg:text-2xl">Personal Information</CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </div>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || "",
                      email: user?.email || "",
                      phone: user?.phone || "",
                      dob: user?.dob || "",
                      gender: user?.gender || "",
                    });
                  }}
                  className="gap-2"
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="md:space-y-8 space-y-4">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                Name
              </Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="h-11"
                  placeholder="Enter your name"
                />
              ) : (
                <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">
                  {formData.name || "Not set"}
                </p>
              )}
            </div>

            <div className="md:space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium">
                Gender
              </Label>
              {isEditing ? (
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm py-2 px-3 bg-muted/50 rounded-md capitalize">
                  {formData.gender || "Not set"}
                </p>
              )}
            </div>

            <div className="md:space-y-2">
              <Label htmlFor="dateOfBirth" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date of Birth
              </Label>
              {isEditing ? (
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  className="h-11"
                />
              ) : (
                <p className="text-sm py-2 px-3 bg-muted/50 rounded-md">
                  {formData.dob
                    ? new Date(formData.dob).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not set"}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Contact Verification
          </CardTitle>
          <CardDescription>
            Email and phone can only be added after OTP verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {verificationStep && (
            <div>
              <div className="h-4 w-4" />
              <div>
                Enter the OTP sent to {verificationStep === "email" ? tempEmail : tempPhone}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                {emailVerified &&(
                  <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>

              {formData.email ? (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg text-sm font-medium">
                  {formData.email}
                </div>
              ) : verificationStep === "email" ? (
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="h-11"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={cancelVerification}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={verifyOTP}
                      disabled={isLoading || otpCode.length !== 6}
                      className="flex-1"
                    >
                      {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="h-11"
                    disabled={verificationStep !== null}
                  />
                  <Button
                    onClick={() => requestOTP("email")}
                    disabled={isLoading || !tempEmail || verificationStep !== null}
                    className="w-full"
                  >
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                {phoneVerified && (
                  <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>

              {formData.phone ? (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg text-sm font-medium">
                  {formData.phone}
                </div>
              ) : verificationStep === "phone" ? (
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="h-11"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={cancelVerification}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={verifyOTP}
                      disabled={isLoading || otpCode.length !== 6}
                      className="flex-1"
                    >
                      {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    className="h-11"
                    disabled={verificationStep !== null}
                  />
                  <Button
                    onClick={() => requestOTP("phone")}
                    disabled={isLoading || !tempPhone || verificationStep !== null}
                    className="w-full"
                  >
                    {isLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
