"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export function ProfileTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light tracking-tight mb-2">Profile Information</h2>
        <p className="text-sm text-muted-foreground">
          Update your account details and preferences
        </p>
      </div>

      <Card className="p-6 md:p-8 border-border">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" className="bg-background" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" className="bg-background" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="bg-background" />
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Save Changes
            </Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6 md:p-8 border-border">
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" className="bg-background" />
          </div>
          <div className="pt-2">
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
