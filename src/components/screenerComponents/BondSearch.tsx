// BondSearch.tsx (Client Component)
"use client";
import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import SearchFilters from './SearchFilters';
import ResultTable from './ResultTable';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as bondsAction from "../../redux/actions/bonds";
import Link from 'next/link';
import Pagination from '../common/Pagination';
import TableLazyLoading from './TableLazyLoading';

const BondSearch = ({ getBonds, bondsData, isBoandsLoader, initialBondsData }: any) => {
    // State to hold the active data source
    const [currentData, setCurrentData] = useState(initialBondsData ?? []);
    const [scrollLength, setScrollLength] = useState(0);

    useEffect(() => {
        // Initial load - use server data
        if (initialBondsData) {
            console.log("Using server-side data", initialBondsData);
            setCurrentData(initialBondsData);
        }

        // Also fetch latest data from API for future updates
        getBonds();
    }, []);

    // When Redux data updates, use it
    useEffect(() => {
        if (bondsData && Object.keys(bondsData).length > 0) {
            console.log("Updating with Redux data");
            setCurrentData(bondsData);
        }
    }, [bondsData]);

    return (
        <div className="container-lg">
            <div className="row flex-column flex-lg-row">
                <div className="col-lg-2">
                    <SearchForm />
                </div>
                <div className="col-sm-12 col-lg-10 border-start">
                    <SearchFilters />
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

                        <Pagination data={initialBondsData} setPageNumber={() => { }} setPerpage={() => { }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Redux connections remain the same
const mapStatesToProps = ({
    bonds: {
        bondsData = {},
        isBoandsLoader = false,
    },
}: any) => {
    return {
        bondsData,
        isBoandsLoader,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators(
        {
            ...bondsAction,
        },
        dispatch
    );
};

export default connect(mapStatesToProps, mapDispatchToProps)(BondSearch);