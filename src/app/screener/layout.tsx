import React from 'react'
import { Metadata } from 'next';
import { Poppins } from "next/font/google";
const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
    title: 'Bond Screener | SQXBonds',
    description: 'Discover bonds and structured notes based on issuer, coupon, yield, maturity, industry, currency, and country. Create and save custom filters.',
    metadataBase: new URL('http://localhost:3000/screener'),
};

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ fontFamily: 'var(--font-poppins)' }} className={`${poppins.variable}`} suppressHydrationWarning>
            {children}
        </div>
    )
}

export default layout