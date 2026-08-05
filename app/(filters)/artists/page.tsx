import FilterPageClient from "@/app/components/Filters/FilterPageClient/FilterPageClient";
import getPageTotal from "@/data/data_fetching/getPageTotal";

export default async function ArtistsPage(){
  const pageTotal = await getPageTotal('artists');
  return(
    <FilterPageClient filterType="artist" pageTotal={pageTotal}/>
  )
}