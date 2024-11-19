import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import "./Contact.css";

export default function Component() {
  return (
    <div
      key="1"
      className="border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md space-y-8 container"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p>
          Please fill the below form and we will get back to you as soon as
          possible.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            className="text-gray-600 dark:text-gray-400 required"
            htmlFor="name"
          >
            Name
          </Label>
          <Input
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 name"
            id="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label
            className="text-gray-600 dark:text-gray-400 required"
            htmlFor="email"
          >
            Email
          </Label>
          <Input
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 email"
            id="email"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="space-y-2">
          <Label
            className="text-gray-600 dark:text-gray-400 required"
            htmlFor="message"
          >
            Message
          </Label>
          <textarea
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full p-2 message"
            id="message"
            placeholder="Type your message"
            required
            rows={4}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            className="text-gray-600 dark:text-gray-400"
            id="agreement"
            required
          />
          <Label
            className="text-sm font-normal text-gray-600 dark:text-gray-400"
            htmlFor="agreement"
          >
            I agree to the
            <button className="underline underline-offset-2 text-gray-600 dark:text-gray-400">
              Terms & Conditions
            </button>
          </Label>
        </div>
        <Button
          className="w-full bg-gray-300 dark:bg-gray-700 text-black"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
