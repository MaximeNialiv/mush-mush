
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-mushdark py-16 text-white">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 font-aeonik">mush•mush</h3>
            <p className="text-gray-300 max-w-md">
              Premium quality, organic mushrooms delivered fresh to your doorstep. 
              From gourmet varieties to medicinal mushrooms, we've got you covered.
            </p>
            
            <div className="mt-6 flex gap-4">
              <a 
                href="#" 
                className="bg-white/10 hover:bg-mushprimary transition-colors rounded-full h-10 w-10 flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5H17.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-mushprimary transition-colors rounded-full h-10 w-10 flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-mushprimary transition-colors rounded-full h-10 w-10 flex items-center justify-center"
                aria-label="Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 font-aeonik">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-mushprimary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#features"
                  className="text-gray-300 hover:text-mushprimary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#testimonials"
                  className="text-gray-300 hover:text-mushprimary transition-colors"
                >
                  Our Products
                </Link>
              </li>
              <li>
                <Link
                  to="#contact"
                  className="text-gray-300 hover:text-mushprimary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 font-aeonik">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-mushprimary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-mushprimary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-300 hover:text-mushprimary transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-mushprimary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Mush•Mush. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="/sitemap"
              className="text-gray-400 hover:text-mushprimary transition-colors text-sm"
            >
              Sitemap
            </a>
            <a
              href="/accessibility"
              className="text-gray-400 hover:text-mushprimary transition-colors text-sm"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
