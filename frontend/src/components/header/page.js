"use client"
import React from 'react'
import Link from 'next/link'

const Page = () => {
    return (
        <div>
            <div className="container-fluid mb-5">
                <div className="row border-top px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <Link href="/" className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100">
                            <h6 className="m-0">Categories</h6>
                            <i className="fa fa-angle-down text-dark" />
                        </Link>

                        <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                            <div className="navbar-nav w-100 overflow-hidden" style={{ height: 410 }}>
                                <div className="nav-item dropdown">
                                    <Link href="/" className="nav-link" data-toggle="dropdown">
                                        Dresses <i className="fa fa-angle-down float-right mt-1" />
                                    </Link>
                                    <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                        <Link href="/" className="dropdown-item">Men's Dresses</Link>
                                        <Link href="/" className="dropdown-item">Women's Dresses</Link>
                                        <Link href="/" className="dropdown-item">Baby's Dresses</Link>
                                    </div>
                                </div>
                                <Link href="/" className="nav-item nav-link">Shirts</Link>
                                <Link href="/" className="nav-item nav-link">Jeans</Link>
                                <Link href="/" className="nav-item nav-link">Swimwear</Link>
                                <Link href="/" className="nav-item nav-link">Sleepwear</Link>
                                <Link href="/" className="nav-item nav-link">Sportswear</Link>
                                <Link href="/" className="nav-item nav-link">Jumpsuits</Link>
                                <Link href="/" className="nav-item nav-link">Blazers</Link>
                                <Link href="/" className="nav-item nav-link">Jackets</Link>
                                <Link href="/" className="nav-item nav-link">Shoes</Link>
                            </div>
                        </nav>
                    </div>

                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <Link href="/" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold">
                                    <span className="text-primary font-weight-bold border px-3 mr-1">E</span>
                                    Shopper
                                </h1>
                            </Link>



                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link href="/" className="nav-item nav-link active">Home</Link>
                                    <Link href="/shop" className="nav-item nav-link">Shop</Link>
                                    <Link href="/" className="nav-item nav-link">Shop Detail</Link>

                                    <div className="nav-item dropdown">
                                        <Link href="/" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages</Link>
                                        <div className="dropdown-menu rounded-0 m-0">
                                            <Link href="/" className="dropdown-item">Shopping Cart</Link>
                                            <Link href="/" className="dropdown-item">Checkout</Link>
                                        </div>
                                    </div>

                                    <Link href="/" className="nav-item nav-link">Contact</Link>
                                </div>
                                <div className="navbar-nav ml-auto py-0">
                                    <Link href="/login" className="nav-item nav-link">Login</Link>
                                    <Link href="/register" className="nav-item nav-link">Register</Link>
                                </div>
                            </div>
                        </nav>

                        {/* Carousel */}
                        <div id="header-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" style={{ height: 410 }}>
                                    <img className="img-fluid" src="assets/img/carousel-1.jpg" alt="Fashionable Dress" loading="lazy" />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: 700 }}>
                                            <h4 className="text-light text-uppercase font-weight-medium mb-3">
                                                10% Off Your First Order
                                            </h4>
                                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                                                Fashionable Dress
                                            </h3>
                                            <Link href="/shop" className="btn btn-light py-2 px-3">Shop Now</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="carousel-item" style={{ height: 410 }}>
                                    <img className="img-fluid" src="assets/img/carousel-2.jpg" alt="Reasonable Price" />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: 700 }}>
                                            <h4 className="text-light text-uppercase font-weight-medium mb-3">
                                                10% Off Your First Order
                                            </h4>
                                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                                                Reasonable Price
                                            </h3>
                                            <Link href="/shop" className="btn btn-light py-2 px-3">Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Controls */}
                            <a className="carousel-control-prev" href="#header-carousel" role="button" data-slide="prev">
                                <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                                    <span className="carousel-control-prev-icon mb-n2" />
                                </div>
                            </a>
                            <a className="carousel-control-next" href="#header-carousel" role="button" data-slide="next">
                                <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                                    <span className="carousel-control-next-icon mb-n2" />
                                </div>
                            </a>

                        </div>
                        {/* End of Carousel */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;
