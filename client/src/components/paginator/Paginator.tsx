import React, {useState} from "react";
import cn from 'classnames';

type PaginatorType = {
    totalItemsCount: number,
    currentPage: number,
    portionSize: number,
    portionSizePaginator?: number,
    onPageChange: (pageNumber: number) => void
}

export const Paginator: React.FC<PaginatorType> = (
    {
        totalItemsCount, currentPage,
        portionSize, onPageChange, portionSizePaginator = 5
    }) => {

    let pagesCount = Math.ceil(totalItemsCount / portionSize);
    let pages: Array<number> = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSizePaginator));

    let portionCount = Math.ceil(pagesCount / portionSizePaginator);

    let leftBorder = (portionNumber - 1) * portionSizePaginator + 1;
    let rightBorder = portionNumber * portionSizePaginator;

    console.log(totalItemsCount, currentPage,
        portionSize, portionSizePaginator)

    return <div className="flex items-center justify-center gap-2 border-2xl w-1/2">
        {portionNumber > 1
            && <button onClick={() => {
                setPortionNumber((actual) => actual - 1)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
                </svg>
            </button>}
        {portionNumber > 1
            && <span onClick={() => {
                setPortionNumber(() => 1)
            }}>1 ...</span>}

        {pages.filter(p => p >= leftBorder && p <= rightBorder)
            .map(p => {
                return (
                    <span
                        className={cn({
                            "font-bold bg-fuscousGray text-white": currentPage == p,
                            "hover:bg-pacificblue hover:text-white": currentPage !== p
                        },  "p-2 rounded-md h-8 w-8 flex items-center justify-center")}
                        key={p}
                        onClick={() => {
                            onPageChange(p);
                        }}>
                    {p}
                </span>
                )
            })
        }
        {portionNumber < portionCount &&
            <span
                onClick={() => {
                    setPortionNumber(() => portionCount)
                }}>... {pagesCount}</span>}
        {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber((actual) => actual + 1)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                </svg>
            </button>}
    </div>
}