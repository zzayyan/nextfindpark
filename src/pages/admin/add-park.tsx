import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Footer } from "@/components/footer";
import { Navbarparkir } from "@/components/navbarparkir";
import { Navbar } from "@/components/navbar";
import { Navbaradmin } from "@/components/navbaradmin";

export default function addPark() {
  return (
    <>
      <Head>
        <title>Tambah Parkiran</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbaradmin />
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="" className="flex ml-2 md:mr-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  FindPark
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Tambah Parkiran</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Tambah Operator</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64 bg-white">
        <div className="h-screen p-4  dark:border-gray-700 mt-14">
          <div className="h-full rounded-xl flex items-start mb-4 rounded bg-gray-300 ">
            <div className="flex flex-wrap w-full">
              <form className="w-full px-12 ">
                <div className="block py-4 ">
                  <label className=" w-36 inline-block text-black text-left">
                    Nama Tempat
                  </label>
                  <input
                    className="rounded-xl text-black w-80"
                    type="text"
                    placeholder="Nama Tempat Parkir"
                  />
                </div>
                <div className="block py-4">
                  <label className=" w-36 inline-block text-black text-left">
                    Deskripsi
                  </label>
                  <textarea
                    className="rounded-xl text-black w-80"
                    placeholder="Deskripsi Singkat"
                  />
                </div>
                <div className="block py-4">
                  <label className=" w-36 inline-block text-black text-left">
                    Upload Lokasi
                  </label>
                  <input
                    className="rounded-xl text-black w-80"
                    type="text"
                    placeholder="Koordinat tempat"
                  />
                </div>
                <div className="block py-4">
                  <label className="w-36 inline-block text-black text-left">
                    Upload Gambar
                  </label>
                  <input
                    className="min-w-0 flex-auto rounded border border-solid border-black text-black"
                    type="file"
                    id="formFile"
                  />
                </div>
                <div className="block py-4 ">
                  <button
                    type="button"
                    className="bg-blue-900 rounded-xl font-bold text-center w-44 h-12"
                  >
                    TAMBAH
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
