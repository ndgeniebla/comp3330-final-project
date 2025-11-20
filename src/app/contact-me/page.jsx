import ContactForm from "@/components/contact-form";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export const metadata = {
  title: "Contact Me",
  description: "Get in touch — send a message about a project, question, or collaboration.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="mb-6">
        <TypographyH1 className="text-2xl font-semibold">Contact</TypographyH1>
        <TypographyP className="text-sm text-muted-foreground mt-1">
          Have a question or just want to say hi? Use the form below and I’ll get back to you.
        </TypographyP>
      </header>

      <section>
        <ContactForm />
      </section>
    </div>
  );
}