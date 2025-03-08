
import {
  Leaf,
  UtensilsCrossed,
  Truck,
  Heart,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-14 w-14 rounded-full bg-mushprimary/10 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-mushdark font-aeonik">{title}</h3>
      <p className="text-mushgray">{description}</p>
    </div>
  );
}

export function Features() {
  const features = [
    {
      icon: <Leaf className="h-7 w-7 text-mushprimary" />,
      title: "100% Organic",
      description:
        "All our mushrooms are grown organically, without any pesticides or harmful chemicals.",
    },
    {
      icon: <UtensilsCrossed className="h-7 w-7 text-mushprimary" />,
      title: "Culinary Excellence",
      description:
        "Carefully selected varieties that enhance flavor profiles in any dish.",
    },
    {
      icon: <Truck className="h-7 w-7 text-mushprimary" />,
      title: "Fast Delivery",
      description:
        "From farm to table in 24 hours, ensuring maximum freshness and nutrient retention.",
    },
    {
      icon: <Heart className="h-7 w-7 text-mushprimary" />,
      title: "Health Benefits",
      description:
        "Rich in vitamins, minerals, and antioxidants to support your overall wellbeing.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-mushlight">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center items-center gap-2 mb-3">
            <div className="h-2 w-10 bg-mushprimary"></div>
            <p className="text-sm uppercase tracking-wide text-mushgray font-medium">Why Choose Us</p>
            <div className="h-2 w-10 bg-mushprimary"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mushdark font-aeonik">
            What Makes Our Mushrooms Special
          </h2>
          <p className="text-lg text-mushgray">
            We're committed to quality at every step from cultivation to delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
