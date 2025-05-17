import { NextApiRequest, NextApiResponse } from "next";
import { sendContactEmail } from "@/utils/actions";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  console.log(req.method);

  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { name, email, message } = body;
      console.log(name, email, message);

      await sendContactEmail({ name, email, message });
      return Response.json({ message: "Message sent successfully." });
    } catch (error) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ message: "Failed to send message." });
    }
  } else {
    // res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
