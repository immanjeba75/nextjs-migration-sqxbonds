'use server';
import BondSearch from "@/components/screenerComponents/BondSearch";
import ScreenerNavbar from "@/components/screenerComponents/ScreenerNavbar";
import { fetchBondData } from "@/fetchSSR/screenerData/getBondsData";

const Page = async () => {
    const initialBondsData = await fetchBondData();
    console.log(initialBondsData);

    return (
        <div>
            <ScreenerNavbar />
            <BondSearch initialBondsData={initialBondsData} />
        </div>
    );
};

export default Page;