import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function StockForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    youtube: "",
    vimeo: "",
    instagram: "",
    tiktok: "",
    facebook: "",
    website: "",
    independent: "",
    advertisement: "",
    other: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/stockForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          youtube: "",
          vimeo: "",
          instagram: "",
          tiktok: "",
          facebook: "",
          website: "",
          independent: "",
          advertisement: "",
          other: "",
        });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Stock Footage Terms & Conditions</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Please list all channels where this will be shown
          </DialogTitle>
          <DialogDescription>
            By purchasing stock footage from Adam Underwater, you must list the
            channels and/or films in which the stock footage will appear. These
            channels are given access to the footage for use publicly. Channels
            not listed are not given access to post this stock footage publicly,
            and are subject to a copyright infringement violation where stock
            footage from Adam Underwater appears.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="Your name"
              onChange={() => {}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="example@example.com"
              className="col-span-3"
              onChange={() => {}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="youtube" className="text-right">
              Youtube
            </Label>
            <Input
              id="youtube"
              placeholder="Youtube channel URL"
              className="col-span-3"
              onChange={() => {}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vimeo" className="text-right">
              Vimeo
            </Label>
            <Input
              id="vimeo"
              placeholder="Vimeo channel URL"
              className="col-span-3"
              onChange={() => {}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="instagram" className="text-right">
              Instagram
            </Label>
            <Input
              id="instagram"
              placeholder="Instagram handle"
              className="col-span-3"
              onChange={() => {}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tiktok" className="text-right">
              Tiktok
            </Label>
            <Input
              id="tiktok"
              placeholder="Tiktok handle"
              className="col-span-3"
              onChange={() => {}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="facebook" className="text-right">
              Facebook
            </Label>
            <Input
              id="facebook"
              placeholder="Facebook profile URL"
              className="col-span-3"
              onChange={() => {}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="website" className="text-right">
              Website
            </Label>
            <Input
              id="website"
              placeholder="Website URL"
              className="col-span-3"
              onChange={() => {}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="independent-film-name" className="text-right">
              Independent Film
            </Label>
            <Input
              id="independent"
              placeholder="Name of Film"
              className="col-span-3"
              onChange={() => {}}
            />
            <Label htmlFor="independent" className="text-right"></Label>
            <Input
              id="independent-production-company"
              placeholder="Production Company"
              className="col-span-3"
              onChange={() => {}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="advertisement" className="text-right">
              Advertisment
            </Label>
            <Input
              id="advertisement-brand-name"
              placeholder="Company/Brand"
              className="col-span-3"
              onChange={() => {}}
            />
            <Label htmlFor="advertisement" className="text-right"></Label>
            <Input
              id="advertisement-production-company"
              placeholder="Production Company"
              className="col-span-3"
              onChange={() => {}}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="other" className="text-right">
              Other
            </Label>
            <Input
              id="other"
              placeholder="Other platform"
              className="col-span-3"
              onChange={() => {}}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default StockForm;
