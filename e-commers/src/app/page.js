import Navbar from "@/compoents/Navbar";
import Footer from "@/compoents/Footer";
import Banner from "@/compoents/Banner";
import FeaturedProduct from "@/compoents/FeaturedProduct";
import HomePageProduct from "@/compoents/HomePageProduct";
import NewsLetter from "@/compoents/NewsLetter";
export default function Home() {
  return (
     <>
       <Navbar />
       <Banner />
       <FeaturedProduct />
       <HomePageProduct />
       <NewsLetter />
       <Footer />
     </>
  );
}
