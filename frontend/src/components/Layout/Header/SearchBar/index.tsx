import { useState, ChangeEvent, FormEvent } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <form
      className="flex items-center justify-center flex-1 h-9 px-4 border border-gray-300 rounded-md shadow-sm bg-[#F2F2F2]"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className="flex-1 border-0 outline-none bg-transparent"
        value={search}
        onChange={handleSearch}
      />
      <button
        type="submit"
        className="flex items-center justify-center w-12 h-full ml-4 text-gray-400 rounded-md hover:bg-gray-100"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M22 22L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
    </form>
  );
}
