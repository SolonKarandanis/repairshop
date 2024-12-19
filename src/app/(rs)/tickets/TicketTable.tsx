"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults"
import { ColumnFiltersState, createColumnHelper, flexRender, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, CircleCheckIcon, CircleXIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
    data: TicketSearchResultsType,
}

type RowType = TicketSearchResultsType[0]

export default function TicketTable({ data }: Props) {
    const router = useRouter()

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: "ticketDate",
            desc: false, // false for ascending 
        }
    ])

    const columnHeadersArray: Array<keyof RowType> = [
        "ticketDate",
        "title",
        "tech",
        "firstName",
        "lastName",
        "email",
        "completed",
    ]

    const columnHelper = createColumnHelper<RowType>()

    const columns = columnHeadersArray.map((columnName) => {
        return columnHelper.accessor((row) => { // transformational 
            const value = row[columnName]
            if (columnName === "ticketDate" && value instanceof Date) {
                return value.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
            }
            if (columnName === "completed") {
                return value
                    ? "COMPLETED"
                    : "OPEN"
            }
            return value
        }, {
            id: columnName,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="pl-1 w-full flex justify-between"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {columnName[0].toUpperCase() + columnName.slice(1)}

                        {column.getIsSorted() === "asc" && (
                            <ArrowUp className="ml-2 h-4 w-4" />
                        )}

                        {column.getIsSorted() === "desc" && (
                            <ArrowDown className="ml-2 h-4 w-4" />
                        )}

                        {column.getIsSorted() !== "desc" && column.getIsSorted() !== "asc" && (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                )
            },
            cell: ({ getValue }) => { // presentational 
                const value = getValue()
                if (columnName === "completed") {
                    return (
                        <div className="grid place-content-center">
                            {value === "OPEN" ? 
                                <CircleXIcon className="opacity-25" /> : <CircleCheckIcon className="text-green-600" />}
                        </div>
                    )
                }
                return value
            }
        })
    })

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="mt-6 flex flex-col gap-4">
            <div className="rounded-lg overflow-hidden border border-border">
                <Table className="border">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="bg-secondary p-1">
                                        <div>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </div>
                                        {header.column.getCanFilter() ? (
                                            <div className="grid place-content-center">
                                                {/* <Filter column={header.column} /> */}
                                            </div>
                                        ) : null}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                                onClick={() => router.push(`/tickets/form?ticketId=${row.original.id}`)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="border">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex basis-1/3 items-center">
                    <p className="whitespace-nowrap font-bold">
                        {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
                        &nbsp;&nbsp;
                        {`[${table.getFilteredRowModel().rows.length} ${table.getFilteredRowModel().rows.length !== 1 ? "total results" : "result"}]`}
                    </p>
                </div>
                <div className="space-x-1">
                    <Button
                        variant="outline"
                        onClick={() => table.resetSorting()}
                    >
                        Reset Sorting
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => table.resetColumnFilters()}
                    >
                        Reset Filters
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}