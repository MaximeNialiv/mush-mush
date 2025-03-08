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
    <Card className="border shadow-sm h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 inline-block">
              ★
            </span>
          ))}
        </div>
        <blockquote className="text-muted-foreground italic">
          "{content}"
        </blockquote>
      </CardContent>
      <CardFooter className="border-t pt-4 pb-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-sm text-muted-foreground">{author.role}</p>
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
        "This product has completely transformed our workflow. The interface is intuitive and the features are exactly what we needed.",
      author: {
        name: "Sarah Johnson",
        role: "Product Manager",
        avatar: "https://i.pravatar.cc/150?img=1",
        initials: "SJ",
      },
    },
    {
      content:
        "I've tried many similar solutions, but this one stands out for its performance and reliability. Highly recommended!",
      author: {
        name: "Michael Chen",
        role: "CTO",
        avatar: "https://i.pravatar.cc/150?img=2",
        initials: "MC",
      },
    },
    {
      content:
        "The customer support is exceptional. They helped us implement the solution quickly and efficiently.",
      author: {
        name: "Emily Rodriguez",
        role: "Operations Director",
        avatar: "https://i.pravatar.cc/150?img=3",
        initials: "ER",
      },
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Don't just take our word for it. Here's what people are saying about
            our product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
