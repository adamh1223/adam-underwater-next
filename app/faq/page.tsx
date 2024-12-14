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
                <AccordionTrigger>There is a problem </AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
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
