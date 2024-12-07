import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults"
import CustomerSearch from "./CustomerSearch"


export const metadata = {
  title: "Customer Search",
}

const CustomersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) => {
  const { searchText } = await searchParams

  if (!searchText) return <CustomerSearch />

  const results = await getCustomerSearchResults(searchText)

  return (
      <>
          <CustomerSearch />
          <p>{JSON.stringify(results)}</p>
      </>
  )
}

export default CustomersPage