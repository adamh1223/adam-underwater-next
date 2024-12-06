import ContactForm from "@/components/form/Contact";


export default function Page() {
  return (
    <div className="flex flex-col items-center pt-10">
      <img
        src="/images/contact2.png"
        alt="Contact Banner"
        className="mb-5"
        style={{ height: "112px" }}
      />
      <ContactForm />
    </div>
  );
}
