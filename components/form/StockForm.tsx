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
import "./StockForm.css";
import { Checkbox } from "@/components/ui/checkbox";

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
      <DialogContent className="modal">
        <DialogHeader>
          <DialogTitle>
            Please list all channels where purchased stock footage will appear.
          </DialogTitle>
          <DialogDescription className="py-3">
            By purchasing stock footage from Adam Underwater, you must list the
            channels and/or films in which the stock footage will appear. These
            channels are given access to the footage for use publicly.{" "}
            <span className="one-entry">
              Only one entry per platform is allowed.
            </span>{" "}
            Channels not listed are not given access to post this stock footage
            publicly, and are subject to a copyright infringement violation
            where stock footage from Adam Underwater appears.{" "}
            <span className="one-entry">
              Second hand sale of purchased clips is not permitted.
            </span>{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 modal-content">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {[
              { id: "name", label: "Name", placeholder: "Your name" },
              {
                id: "email",
                label: "Email",
                placeholder: "example@example.com",
              },
              {
                id: "youtube",
                label: "Youtube",
                placeholder: "Youtube channel URL",
              },
              { id: "vimeo", label: "Vimeo", placeholder: "Vimeo channel URL" },
              {
                id: "instagram",
                label: "Instagram",
                placeholder: "Instagram handle",
              },
              { id: "tiktok", label: "Tiktok", placeholder: "Tiktok handle" },
            ].map(({ id, label, placeholder }) => (
              <div key={id} className="flex items-center gap-4">
                <Label htmlFor={id} className="w-32 text-right">
                  {label}
                </Label>
                <Input
                  id={id}
                  placeholder={placeholder}
                  className="flex-grow"
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {[
              {
                id: "facebook",
                label: "Facebook",
                placeholder: "Facebook profile URL",
              },
              { id: "website", label: "Website", placeholder: "Website URL" },
              {
                id: "independent",
                label: "Independent Film",
                placeholder: "Name of Film",
              },
              {
                id: "independent-production-company",
                label: " ",
                placeholder: "Production Company",
              },
              {
                id: "advertisement",
                label: "Advertisement",
                placeholder: "Company/Brand",
              },
              {
                id: "advertisement-production-company",
                label: " ",
                placeholder: "Production Company",
              },
              { id: "other", label: "Other", placeholder: "Channel URL" },
            ].map(({ id, label, placeholder }) => (
              <div key={id} className="flex items-center gap-4">
                {label && (
                  <Label htmlFor={id} className="w-32 text-right">
                    {label}
                  </Label>
                )}
                <Input
                  id={id}
                  placeholder={placeholder}
                  className="flex-grow"
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">I agree to the terms and conditions</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="platform-terms" />
              <Label htmlFor="platform-terms">
                I have listed all platforms where this stock footage will be
                shown
              </Label>
            </div>
          </div>
          <Button type="submit" className="self-end">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default StockForm;
