function Footer() {
  return (
    <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-blue-700">
      <span class="text-sm text-white sm:text-center dark:text-white">
        © 2025{" "}
        <a href="#" class="hover:underline">
          holmnotfound™
        </a>
        . All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
        <li>
          <a href="#" class="hover:underline me-4 md:me-6">
            About
          </a>
        </li>
        <li>
          <a href="#" class="hover:underline me-4 md:me-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" class="hover:underline me-4 md:me-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" class="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer
