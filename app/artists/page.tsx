import FilterPageClient from "../components/FilterPageClient";
import getPageTotal from "@/data_fetching/actions/getPageTotal";

export default async function ArtistsPage(){
  const pageTotal = await getPageTotal('artists');
  return(
    <FilterPageClient filterType="artist" pageTotal={pageTotal}/>
  )
}