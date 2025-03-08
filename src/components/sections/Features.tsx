import {
  Zap,
  Shield,
  Smartphone,
  Code,
  PaintBucket,
  LayoutGrid,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function Features() {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Fast Performance",
      description:
        "Optimized for speed and efficiency, ensuring your website loads quickly on all devices.",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Secure by Default",
      description:
        "Built with security in mind, protecting your data and your users' information.",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      title: "Responsive Design",
      description:
        "Looks great on all devices, from mobile phones to desktop computers.",
    },
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Clean Code",
      description:
        "Written with best practices and maintainability in mind, making it easy to customize.",
    },
    {
      icon: <PaintBucket className="h-6 w-6 text-primary" />,
      title: "Customizable",
      description:
        "Easily change colors, fonts, and layouts to match your brand and requirements.",
    },
    {
      icon: <LayoutGrid className="h-6 w-6 text-primary" />,
      title: "Modular Components",
      description:
        "Built with reusable components that can be mixed and matched to create unique layouts.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to build beautiful websites that stand out from
            the crowd.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
