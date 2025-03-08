
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Form submitted!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-mushlight">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-10 bg-mushprimary"></div>
              <p className="text-sm uppercase tracking-wide text-mushgray font-medium">Contact Us</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mushdark font-aeonik">
              Get in Touch
            </h2>
            <p className="text-lg text-mushgray mb-8">
              Have questions or want to place a special order? We'd love to hear from you. 
              Fill out the form and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-6 mt-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-mushprimary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-mushprimary" />
                </div>
                <div>
                  <h4 className="font-bold text-mushdark">Phone</h4>
                  <p className="text-mushgray">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-mushprimary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-mushprimary" />
                </div>
                <div>
                  <h4 className="font-bold text-mushdark">Email</h4>
                  <p className="text-mushgray">hello@mushmush.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-mushprimary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-mushprimary" />
                </div>
                <div>
                  <h4 className="font-bold text-mushdark">Address</h4>
                  <p className="text-mushgray">
                    123 Mushroom Lane, Fungi City, FC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-mushdark">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} className="rounded-lg border-gray-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-mushdark">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your email address"
                          type="email"
                          {...field}
                          className="rounded-lg border-gray-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-mushdark">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message"
                          className="min-h-[120px] rounded-lg border-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-mushprimary hover:bg-mushprimary/90 text-white rounded-full font-aeonik"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
