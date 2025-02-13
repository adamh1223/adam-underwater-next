import { NextApiRequest, NextApiResponse } from "next";
import { sendStockFootageForm } from "@/utils/actions";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  console.log(req.method);

  if (req.method === "POST") {
    try {
      const body = await req.json();
      const {
        name,
        email,
        message,
        youtube,
        vimeo,
        instagram,
        tiktok,
        facebook,
        website,
        independent,
        advertisement,
        other,
      } = body;
      console.log(
        name,
        email,
        message,
        youtube,
        vimeo,
        instagram,
        tiktok,
        facebook,
        website,
        independent,
        advertisement,
        other
      );

      await sendStockFootageForm({
        name,
        email,
        youtube,
        vimeo,
        instagram,
        tiktok,
        facebook,
        website,
        independent,
        advertisement,
        other,
      });
      return Response.json({ message: "Form submitted successfully." });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({ message: "Failed to submit form." });
    }
  } else {
    // res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
