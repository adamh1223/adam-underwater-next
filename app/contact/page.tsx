import ContactForm from "@/components/form/Contact";

export default function Page() {
  return (
    <div className="flex flex-col items-center pt-4">
      <img
        src="/images/contact2.png"
        alt="Contact Banner"
        className="mb-5"
        style={{ height: "100px" }}
      />
      <ContactForm />
    </div>
  );
}
