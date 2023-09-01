export default function NavBar() {
  return (
    <section className="flex mx-auto w-[1120px]">
      <nav className="flex items-center justify-between w-full h-14">
        <ul className="flex items-end justify-between h-full text-sm text-gray-500 space-x-2">
          <li className="flex items-center justify-center hover:bg-gray-200 px-4 py-2 cursor-pointer">
            <a href="#">Women</a>
          </li>
          <li className="flex items-center justify-center hover:bg-gray-200 px-4 py-2 cursor-pointer">
            <a href="#">Men</a>
          </li>
          <li className="flex items-center justify-center hover:bg-gray-200 px-4 py-2 cursor-pointer">
            <a href="#">Kids</a>
          </li>
          <li className="flex items-center justify-center hover:bg-gray-200 px-4 py-2 cursor-pointer">
            <a href="#">Maternity</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
