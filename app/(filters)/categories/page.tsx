import FilterPageClient from "@/app/components/Filters/FilterPageClient/FilterPageClient";
import getPageTotal from "@/data/data_fetching/getPageTotal";

export default async function CatsPage(){
  const pageTotal = await getPageTotal('cats');
  return(
    <FilterPageClient filterType="cat" pageTotal={pageTotal}/>
  )
}