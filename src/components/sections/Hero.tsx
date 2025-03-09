
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-mushlight py-16 md:py-20">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-10 bg-mushprimary"></div>
              <p className="text-sm uppercase tracking-wide text-mushgray font-medium">Premium Quality</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-mushdark leading-tight">
              Discover the<br />
              <span className="text-mushprimary">Freshest Mushrooms</span><br />
              For Your Meals
            </h1>
            <p className="text-lg text-mushgray max-w-md">
              We deliver fresh, premium-quality mushrooms right to your doorstep. Harvested daily for maximum flavor and nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button 
                size="lg" 
                className="bg-mushprimary hover:bg-mushprimary/90 text-white rounded-full"
              >
                Order Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-mushgray/30 text-mushdark hover:bg-transparent hover:border-mushprimary group"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-mushdark">100%</p>
                <p className="text-sm text-mushgray">Organic</p>
              </div>
              <div className="h-10 w-px bg-mushgray/20"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-mushdark">24h</p>
                <p className="text-sm text-mushgray">Delivery</p>
              </div>
              <div className="h-10 w-px bg-mushgray/20"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-mushdark">4.9</p>
                <p className="text-sm text-mushgray">Rating</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
              alt="Fresh mushroom dish"
              className="rounded-3xl object-cover w-full max-w-[500px] aspect-square"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
