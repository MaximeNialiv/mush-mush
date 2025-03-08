
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TestimonialProps {
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    initials: string;
  };
}

function TestimonialCard({ content, author }: TestimonialProps) {
  return (
    <Card className="border-0 shadow-sm h-full flex flex-col bg-white rounded-2xl">
      <CardContent className="pt-8 flex-grow">
        <div className="mb-4 flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-mushprimary inline-block text-lg">
              ★
            </span>
          ))}
        </div>
        <blockquote className="text-mushgray">
          "{content}"
        </blockquote>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-4 pb-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-mushdark">{author.name}</p>
            <p className="text-sm text-mushgray">{author.role}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function Testimonials() {
  const testimonials = [
    {
      content:
        "The mushrooms from Mush•Mush are incredibly fresh and flavorful. They've elevated every dish I add them to!",
      author: {
        name: "Sarah Johnson",
        role: "Home Chef",
        avatar: "https://i.pravatar.cc/150?img=1",
        initials: "SJ",
      },
    },
    {
      content:
        "As a restaurant owner, quality is everything. These mushrooms consistently impress both our chefs and customers.",
      author: {
        name: "Michael Chen",
        role: "Restaurant Owner",
        avatar: "https://i.pravatar.cc/150?img=2",
        initials: "MC",
      },
    },
    {
      content:
        "Fast delivery and exceptional freshness. I love that they're 100% organic and sustainably grown. Will keep ordering!",
      author: {
        name: "Emily Rodriguez",
        role: "Food Blogger",
        avatar: "https://i.pravatar.cc/150?img=3",
        initials: "ER",
      },
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-50/70">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center items-center gap-2 mb-3">
            <div className="h-2 w-10 bg-mushprimary"></div>
            <p className="text-sm uppercase tracking-wide text-mushgray font-medium">Testimonials</p>
            <div className="h-2 w-10 bg-mushprimary"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mushdark font-aeonik">
            What Our Customers Say
          </h2>
          <p className="text-lg text-mushgray">
            Don't just take our word for it. Here's what people are saying about our premium mushrooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              author={testimonial.author}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
