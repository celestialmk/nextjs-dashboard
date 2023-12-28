'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce'


export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  //debouncing to limit rate at which function fires; trigger event, wait, execution
  //reduce number of requests sent to database and save resources
  const handleSearch =  useDebouncedCallback((term: string) => {
    console.log(`Searching...${term}`)
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);  //update the URL with user's search data, updated without reloading the page
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()} //ensure input field is in sync with the URL and populated when sharing
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
