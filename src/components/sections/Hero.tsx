import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Build beautiful websites with ease
            </h1>
            <p className="text-xl text-muted-foreground">
              A modern landing page template for your next project. Showcase
              your product or service with this beautiful and responsive design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/514052827aa4f55413c6abccaa06f5e7f5a0d392d694fa63fe06a1d6e8e8e172?placeholderIfAbsent=true"
              alt="Hero illustration"
              className="aspect-[0.41] object-contain w-full max-w-[480px] mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
