"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Manifest from "@mnfst/sdk";
import { useState } from "react";

export default function NewsLetter() {
  const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // Message to display in the alert

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Retrieve email from the input field
    const form = e.currentTarget as HTMLFormElement;
    const emailInput = form.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const email = emailInput?.value;

    if (!email) {
      setAlertMessage("Please enter a valid email.");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000); // Hide the alert after 3 seconds
      return;
    }

    const manifest = new Manifest();
    manifest
      .from("subscribers")
      .create({ email })
      .then(() => {
        form.reset(); // Reset the email input field after success
        setAlertMessage(
          "Successfully subscribed! We will contact you if you are selected."
        );
        setAlertVisible(true); // Show success alert
        setTimeout(() => setAlertVisible(false), 3000); // Hide the alert after 3 seconds
      })
      .catch((error) => {
        setAlertMessage(`Failed to add subscriber: ${error.message || error}`);
        setAlertVisible(true); // Show error alert
        setTimeout(() => setAlertVisible(false), 3000); // Hide the alert after 3 seconds
      });
  };
  //   return (
  //     <div>
  //       <div>
  //         <div>
  //           <div>
  //             <h1 className="text-3xl font-bold pb-2">Subscribe to our Newsletter! 💌</h1>
  //             <p className="text-balance text-muted-foreground pb-3">
  //               Get the latest news, discount codes, and special offers delivered straight to your inbox.
  //             </p>
  //           </div>
  //           <form className="grid gap-4" onSubmit={handleSubmit}>
  //   <div className="flex w-full max-w-sm items-center space-x-2">
  //     <Input type="email" placeholder="Email" name="email" />
  //     <Button type="submit">Subscribe</Button>
  //   </div>
  // </form>
  //         </div>
  //       </div>
  //       <div></div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <div>
        <div className="relative mx-auto grid max-w-[540px] gap-6">
          <div className="grid gap-2 text-left">
            <h1 className="text-3xl font-bold">
              Subscribe to my Newsletter! 💌
            </h1>
            <p className="text-balance text-muted-foreground">
              Get the latest news, updates, and special offers delivered
              straight to your inbox.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="m@example.com"
                name="email"
                required
              />
              <Button type="submit">Subscribe</Button>
            </div>
          </form>
          {/* Display the alert based on alertVisible state */}
          {alertVisible && (
            <Alert className="absolute bottom-[-90px] bg-teal-300 border-teal-400 text-teal-800">
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
