import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      {/* background-color: #6A3AE7; border: none; color: white; height: 50px;
      width: 150px; text-align: center; text-decoration: none; display:
      inline-block; font-size: 15px; border-radius: 15px; font-weight: bold; */}
      <Navbar />
      <div>
        <main className={styles.main}>
          <div className="flex w-1/2 flex-col container mr-auto py-32 relative">
            <h1 className=" text-5xl font-sans text-left">
              Temukan Lahan Parkiran Terdekat Dengan Mu
            </h1>
            <div className="py-5">
              <h2 className="text-xl font-sans text-left">
                Mempermudah anda dalam menemukan lahan parkir.
              </h2>
              <p className="text-s font-sans text-left">
                Segera daftarkan diri anda jika belum mempunyai akun
              </p>
            </div>
          </div>
          <div className="w-max grid-cols-4 mb-20 max-w-full text-center">
            <div>
              <button
                type="button"
                className="h-12 w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-m  mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <a href="">Login</a>
              </button>
            </div>
            <div>
              <button
                type="button"
                className="h-12 w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-m  mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <a href="">Daftar</a>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
