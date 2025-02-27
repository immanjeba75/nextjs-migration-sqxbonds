"use client"
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
interface PaginationProps {
    data: {
        page_no?: number
        per_page?: number
        start_record?: number
        end_record?: number
        total_records?: number
        filteredRecords?: number
    }
    setPerpage: (value: number) => void
    setPageNumber: (value: number) => void
    isLoading?: boolean
}
const Pagination = ({ data, setPerpage, setPageNumber, isLoading = false }: PaginationProps) => {
    const { page_no, per_page, start_record, end_record, total_records, filteredRecords } = data;

    const total_no_records = useMemo(() => filteredRecords ?? total_records, [filteredRecords, total_records]);

    const total_pages = useMemo(() => total_no_records && per_page ? Math.ceil(total_no_records / per_page) : 0, [total_no_records, per_page]);

    const [renderPages, setRenderPages] = useState([1, 2, 3]);

    const [selectedPerPage, setSelectedPerPage] = useState(per_page);
    const [selectedPageNumber, setSelectedPageNumber] = useState(page_no ?? 1);

    const handleCalculateRenderPages = useCallback((page_number?: number) => {
        const current_page_no = page_number ?? page_no;
        const lastPage = total_no_records && per_page && Math.ceil(total_no_records / per_page);
        if (current_page_no && lastPage && page_no) {
            let renderPages = []
            const initPage = selectedPageNumber === lastPage ? selectedPageNumber - 2 : selectedPageNumber - 1;
            for (let i = initPage; i <= (selectedPageNumber > 1 ? selectedPageNumber + 1 : selectedPageNumber + 2); i++) {
                if (i > 0 && i <= lastPage)
                    renderPages.push(i)
            }
            setRenderPages(renderPages)
        }
    }, [page_no, per_page, total_no_records, selectedPageNumber])

    const handleChangePerPage = useCallback((per_page: number) => {
        setPerpage(per_page)
        setSelectedPerPage(per_page)
        setSelectedPageNumber(1)
    }, [])

    const handleChangePageNumber = useCallback((page_no: number) => {
        if (page_no < 1 || page_no > total_pages) {
            return
        }
        setPageNumber(page_no)
        setSelectedPageNumber(page_no)
    }, [total_pages])

    useEffect(() => {
        handleCalculateRenderPages()
    }, [selectedPerPage, selectedPageNumber, per_page, page_no, total_no_records])

    useEffect(() => {
        if (page_no) {
            setSelectedPageNumber(page_no)
        }
        if (per_page) {
            setSelectedPerPage(per_page)
        }
    }, [page_no, per_page])

    const isShowFirstThreeDots = useMemo(() => selectedPageNumber >= 4, [selectedPageNumber]);
    const isShowLastThreeDots = useMemo(() => selectedPageNumber <= total_pages - 3, [selectedPageNumber, total_pages]);

    return (
        <div className={`pagination-component row my-3 align-items-center `}>
            <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center justify-content-lg-start">
                <span className='text-muted text-sm' >Showing results {start_record ?? 0} - {end_record ?? 0} of {filteredRecords ?? total_records ?? 0} </span>
            </div>
            <div className={`my-1 my-sm-auto text-sm col-12 col-lg-3 d-flex align-items-center justify-content-center justify-content-lg-end ${isLoading ? 'opacity-75 pe-none' : ''}`}>
                <span>Per page</span>
                <select value={selectedPerPage} className='border-0 outline-0' onChange={(e) => handleChangePerPage(parseInt(e.target.value))}>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div className={`col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end gap-2 align-items-center navigation-buttons-container ${isLoading ? 'opacity-75 pe-none' : ''}`}>
                <span
                    className={` ${selectedPageNumber === 1 ? 'disabled' : 'cursor-pointer material-shadow'}`}
                    onClick={() => handleChangePageNumber(1)}
                >
                    <FontAwesomeIcon size='xs' icon={faAnglesLeft} />
                </span>
                <span
                    className={` ${selectedPageNumber === 1 ? 'disabled' : 'cursor-pointer material-shadow'}`}
                    onClick={() => handleChangePageNumber(selectedPageNumber - 1)}
                >
                    <FontAwesomeIcon size='xs' icon={faAngleLeft} />
                </span>
                {isShowFirstThreeDots && <span className='disabled mb-1'>...</span>}
                {renderPages.map((page) => (
                    <span
                        className={`cursor-pointer material-shadow ${selectedPageNumber === page && 'active'}`}
                        key={page}
                        onClick={() => handleChangePageNumber(page)}>
                        {page}
                    </span>
                ))}
                {isShowLastThreeDots && <span className='disabled mb-1'>...</span>}
                <span
                    className={`  ${selectedPageNumber === total_pages ? 'disabled' : 'cursor-pointer material-shadow'}`}
                    onClick={() => handleChangePageNumber(selectedPageNumber + 1)}
                >
                    <FontAwesomeIcon size='xs' icon={faAngleRight} />
                </span>
                <span
                    className={` ${selectedPageNumber === total_pages ? 'disabled' : 'cursor-pointer material-shadow'}`}
                    onClick={() => handleChangePageNumber(total_pages)}
                >
                    <FontAwesomeIcon size='xs' icon={faAnglesRight} />
                </span>
            </div>
        </div>
    )
}

export default memo(Pagination)