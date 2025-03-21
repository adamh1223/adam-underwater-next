"use client";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

function NavSearch({isEProduct}:{isEProduct:Boolean}) {
  const searchParams = useSearchParams()
  const {replace} = useRouter()
  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '')
  const handleSearch = useDebouncedCallback((value:string)=>{
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('search',value)
    }
    else {
      params.delete('search')
    }

    if (isEProduct) {
      replace(`/stock?${params.toString()}`)
    } else {

      replace(`/products?${params.toString()}`)
    }

  },300)
  useEffect(() => {
    if(!searchParams.get('search')) {
      setSearch('')
    }
  }, [searchParams.get('search')])
  return (
    <Input
      type="search"
      placeholder={isEProduct? "search clip...": "search product..."}
      className="max-w-xs dark:bg-muted"
      onChange={(e) => {
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
      value={search}
    ></Input>
  );
}

export default NavSearch;
