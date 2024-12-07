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

  return (
    <div>CustomersPage</div>
  )
}

export default CustomersPage