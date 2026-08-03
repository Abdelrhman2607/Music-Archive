import FilterPageClient from "../components/FilterPageClient/FilterPageClient";
import getPageTotal from "@/data/data_fetching/actions/getPageTotal";

export default async function ArtistsPage(){
  const pageTotal = await getPageTotal('artists');
  return(
    <FilterPageClient filterType="artist" pageTotal={pageTotal}/>
  )
}