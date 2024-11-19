/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0EyGBV5aW7U
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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

export default function Component() {
  return (
    <div
      key="1"
      className="border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="text-gray-500 dark:text-gray-400">
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
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            id="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="flex space-x-2 space-y-2 items-end">
          <div className="w-1/12 space-y-2">
            <Label
              className="text-gray-600 dark:text-gray-400 required"
              htmlFor="prefix"
            >
              Prefix
            </Label>
            <Select>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="+1">
                    <img
                      alt="US Flag"
                      className="inline-block mr-2"
                      height={20}
                      src="/placeholder.svg"
                      style={{ aspectRatio: "20/20", objectFit: "cover" }}
                      width={20}
                    />
                    (+1)
                  </SelectItem>
                  <SelectItem value="+44">
                    <img
                      alt="UK Flag"
                      className="inline-block mr-2"
                      height={20}
                      src="/placeholder.svg"
                      style={{ aspectRatio: "20/20", objectFit: "cover" }}
                      width={20}
                    />
                    (+44)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-3/4 space-y-2">
            <Label
              className="text-gray-600 dark:text-gray-400 required"
              htmlFor="phone"
            >
              Phone Number
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              id="phone"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label
            className="text-gray-600 dark:text-gray-400 required"
            htmlFor="message"
          >
            Message
          </Label>
          <textarea
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full p-2"
            defaultValue="I would like to receive more information"
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
          className="w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
