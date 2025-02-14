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
import { useState, useEffect } from "react";
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
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePlatforms, setAgreePlatforms] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

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

    if (!agreeTerms || !agreePlatforms) {
      setError("Please agree to the terms and conditions before submitting.");
      return;
    }

    setError("");
    setStatus("Sending...");

    try {
      const response = await fetch("/api/stockForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Form submitted successfully!");
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
        setAgreeTerms(false);
        setAgreePlatforms(false);
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
            where stock footage from Adam Underwater appears. Unauthorized platforms using stock footage may result in content being taken down.{" "}
            <span className="one-entry">
              Second-hand sale of purchased clips is not permitted.
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
                  name={id}
                  placeholder={placeholder}
                  className="flex-grow"
                  onChange={handleChange}
                  value={formData[id as keyof typeof formData]}
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
                id: "advertisement",
                label: "Advertisement",
                placeholder: "Company & Product",
              },
              { id: "other", label: "Other", placeholder: "Channel URL" },
            ].map(({ id, label, placeholder }) => (
              <div key={id} className="flex items-center gap-4">
                <Label htmlFor={id} className="w-32 text-right">
                  {label}
                </Label>
                <Input
                  id={id}
                  name={id}
                  placeholder={placeholder}
                  className="flex-grow"
                  onChange={handleChange}
                  value={formData[id as keyof typeof formData]}
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="flex flex-col items-center gap-4 py-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              />
              <Label htmlFor="terms">
                I agree to these terms and conditions
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="platform-terms"
                checked={agreePlatforms}
                onCheckedChange={(checked) =>
                  setAgreePlatforms(checked === true)
                }
              />
              <Label htmlFor="platform-terms">
                I have listed all platforms where this stock footage will be
                shown
              </Label>
            </div>
          </div>
          <Button type="submit" className="self-end" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
        <div className="flex justify-center">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {status && <p className="text-md">{status}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StockForm;
