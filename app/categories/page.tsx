import FilterPageClient from "../components/FilterPageClient/FilterPageClient";
import getPageTotal from "@/data_fetching/actions/getPageTotal";

export default async function CatsPage(){
  const pageTotal = await getPageTotal('cats');
  return(
    <FilterPageClient filterType="cat" pageTotal={pageTotal}/>
  )
}