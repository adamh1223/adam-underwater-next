"use client";

import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";

function SignOutLink() {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({ description: "Logout Successful" });
  };

  return (
    <SignOutButton>
      <button
        className="w-full text-left"
        onClick={handleLogout} // Show the toast when the user clicks the button
      >
        Sign Out
      </button>
    </SignOutButton>
  );
}

export default SignOutLink;
