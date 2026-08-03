import FilterPageClient from "../components/FilterPageClient/FilterPageClient";
import getPageTotal from "@/data/data_fetching/actions/getPageTotal";

export default async function TagsPage(){
  const pageTotal = await getPageTotal('tags');
  return(
    <FilterPageClient filterType="tag" pageTotal={pageTotal}/>
  )
}