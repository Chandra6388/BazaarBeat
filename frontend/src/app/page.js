import Image from "next/image";
import styles from "./page.module.css";
import Topheader from "../components/topHeader/page"
import Header from "@/components/header/page";
import Future from "@/components/future/page";
import Category from "@/components/category/page";
import Offer from "@/components/Offer/page";
import TrandyProduct from "@/components/TrandyProduct/page";
import NewProduct from "@/components/newProduct/page";
import Subscribe from "@/components/Subscribe/page";
import Footer from "@/components/Footer/page";


export default function Home() {
  return (
    <>
      <Topheader/>
        <Header/>
        <Future/>
        <Category/>
        <Offer/>
        <TrandyProduct/>
        <Subscribe/>
        <NewProduct/>
        <Footer/>

    </>
  );
}
