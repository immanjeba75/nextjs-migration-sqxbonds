"use client";

import React, { useEffect, useState } from 'react';
import Pagination from '../common/Pagination';
import Link from 'next/link';
import useWindowSize from '@/hooks/useWindowSize';
import TableLazyLoading from './TableLazyLoading';

const ResultTable = ({
    bondsData,
    scrollLength,
    setScrollLength,
    currentData,
    initialBondsData,
    isBoandsLoader
}: any) => {
    const is_logged_in = false;
    const [bondList, setbondList] = useState<any>([]);
    const windowSize = useWindowSize();
    const [headerFixed, setHeaderFixed] = useState(false);
    const [headerTop, setHeaderTop] = useState(0);

    // Log data and bondsData for debugging
    // console.log("ResultTable data:", data);
    // console.log("ResultTable bondsData:", bondsData);

    // Update bondList when data changes
    // useEffect(() => {
    //     if (data?.bonds) {
    //         setbondList(data.bonds);
    //     }
    // }, [data]);

    // Handle scroll for fixed header
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            setHeaderTop(scrollY < 0 ? 0 : Math.max(0, scrollY));
            setHeaderFixed(scrollY > 40);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const isMobile = windowSize?.width <= 600;
    const filterListHeight =
        (document.querySelector("div#filterList") as HTMLElement)?.offsetHeight ?? 0;
    const { height: windowHeight } = useWindowSize();
    const tableHeight =
        windowHeight - filterListHeight - (isMobile ? 360 : 165) + "px";
    const tableHeaderStyle = {
        top: headerTop === 0 ? 0 : headerTop - filterListHeight - 25 + "px",
    };

    return (
        <div className='pt-1'>
            <div style={{ height: "540px", overflow: "auto" }}>
                <table className={`table table-responsive `} >
                    <thead
                        className="table-secondary sticky-top"
                    // style={tableHeaderStyle}
                    >
                        <tr>
                            <th className='text-sm'>BOND NAME</th>
                            <th className='text-sm'>COUNTRY</th>
                            <th className='text-sm'>MATURITY</th>
                            <th className='text-sm'>COUPON(%)</th>
                            <th className='text-sm'>YIELD(%)</th>
                            <th className='text-sm'>CHANGE</th>
                            {/* {is_logged_in && <th />} */}
                        </tr>
                    </thead>
                    <tbody>
                        {(currentData ?? initialBondsData).length === 0 || isBoandsLoader ? (
                            <TableLazyLoading isLoggedIn={true} />
                        ) : null}
                        {(currentData ?? initialBondsData)?.bonds?.map((bond: any, index: any) => (
                            <tr
                                id={bond.isin}
                                key={bond.isin}
                            // className={`${lastVisitedISIN === bond.isin ? "lastVisitedISIN" : ""
                            //     } `}
                            >
                                <td className="bg-light-subtle text-sm">
                                    <span
                                        className={`${bond.status === "Active"
                                            ? "link-primary "
                                            : "text-muted"
                                            } cursor-pointer d-flex flex-column text-black`}
                                    >
                                        <Link
                                            href={'/bonds/' + bond.isin}
                                            // href=/bond.isin}
                                            className="d-block text-sm font-semibold no-underline  text-truncate fw-medium text-black"

                                        >
                                            {bond?.isin === null || bond?.isin === ""
                                                ? "—"
                                                : bond?.bond_name}
                                        </Link>
                                        <span className="d-flex font-light align-items-center gap-1">
                                            {/* <Link
                                                to={getToLink(bond.isin)}
                                                className="text-muted"
                                                onClick={() =>
                                                    handleBondNameClick(bond.bond_name, bond.isin)
                                                }
                                            > */}
                                            {bond?.issuer}
                                            {/* </Link> */}
                                            {/* <a href={"/bonds/" + bond.isin} className='d-none'>{bond.bond_name}</a> */}
                                            {/* {isLoggedIn &&
                                                (bond?.follow_bond === true ? (
                                                    <BookmarkCheckFill
                                                        color="#294772"
                                                        className="cursor-pointer"
                                                        title="Unfollow"
                                                        onClick={() =>
                                                            handleFollowBond(bond.isin, index)
                                                        }
                                                    />
                                                ) : (
                                                    <Bookmark
                                                        color="#294772"
                                                        className="cursor-pointer"
                                                        title="Follow"
                                                        onClick={() =>
                                                            handleFollowBond(bond.isin, index)
                                                        }
                                                    />
                                                ))} */}
                                        </span>
                                    </span>
                                </td>

                                <td className="bg-light-subtle text-sm">
                                    {bond?.country_name === null
                                        ? "—"
                                        : bond?.country_name}
                                </td>
                                <td className="text-nowrap bg-light-subtle text-sm">
                                    {bond?.maturity === null ? "—" : bond?.maturity}
                                </td>
                                <td className="text-end px-4 bg-light-subtle text-sm" width="10%">
                                    {bond?.coupon === null
                                        ? bond.description.slice(0, 2) === "ZC"
                                            ? "0.00"
                                            : "—"
                                        : bond?.coupon?.toFixed(3)}
                                </td>
                                <td className="text-end px-4 bg-light-subtle text-sm">
                                    {bond?.market_yield === null
                                        ? bond.description.slice(0, 2) === "ZC"
                                            ? "0.00"
                                            : "—"
                                        : bond?.market_yield?.toFixed(2)
                                    }

                                </td>
                                <td className={`text-end px-4 bg-light-subtle text-sm`}>

                                    {bond?.changepercentage === null
                                        ? "—"
                                        : bond.changepercentage?.toFixed(3)}

                                    {/* {bond?.chng === null || bond?.chng === 0
                                        ? "—"
                                        : bond?.chng > 0
                                            ? "+" + bond?.chng?.toFixed(3)
                                            : bond?.chng?.toFixed(3)} */}

                                </td>

                            </tr>
                        ))}
                        {!initialBondsData?.bonds?.length && (
                            <tr>
                                <td colSpan={7} className="text-center ">
                                    No data found!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                {(currentData??initialBondsData) && (currentData??initialBondsData).page_no && (currentData??initialBondsData).total_pages && (
                    <Pagination data={(currentData??initialBondsData)} setPageNumber={() => { }} setPerpage={() => { }} />
                )}
            </div>
        </div>
    );
};

export default ResultTable;