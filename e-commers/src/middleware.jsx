"use client";
import React, { useState, useEffect, use } from "react";
import { NextResponse } from 'next/server';

export function middleware(request) {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedData = JSON.parse(userData);
            setUserData(parsedData);
        }
    }, []);

    if (!userData || userData.length === 0 || userData === null) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/admin') && userData.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/user') && userData.role !== 'USER') {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (request.nextUrl.pathname.startsWith('/seller') && userData.role !== 'SELLER') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*', '/dashboard/:path*', '/seller/:path*', '/'],
};
