import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faq = () => {
  return (
    <>
      <section>
        <div className="flex justify-center">
          <img
            src={"/images/faq2.png"}
            style={{ height: "110px" }}
            className="pt-5"
          />
        </div>
        <div className="flex justify-center card-container pt-5">
          <Card className="p-7 w-[50%]">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  My desired print size is not available?
                </AccordionTrigger>
                <AccordionContent>
                  Fill out a contact form and let me know your size and I can
                  create your custom size if it is possible.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Do products ship internationally?
                </AccordionTrigger>
                <AccordionContent>
                  My electronic products - LUTS and Sound FX are available from
                  anywhere in the world, but at this time prints can only be
                  shipped within the United States.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  I purchased an E-product and it didn't download. What should I
                  do?
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  May I share stock footage I purchased for anyone to use
                  publicly?
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </section>
    </>
  );
};

export default faq;
