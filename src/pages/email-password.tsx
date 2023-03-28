import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";

export default function sendEmail() {
  return (
    <>
      <Navbar />
      <Head>
        <title>Change Password</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className="p-36 flex items-center justify-between flex-col-2 min-h-screen bg-white">
          <form>
            <div>
              <div>
                <p className="text-5xl text-amber-900 pb-5 font-bold">
                  Lupa Password
                </p>
                <p className="text-xl text-black pb-7">
                  Masukkan email yang didaftarkan
                </p>
              </div>
              <div className="pb-5">
                <input
                  type="text"
                  className="rounded-lg w-96 text-black"
                  placeholder="Masukan email anda"
                />
              </div>
              <div>
                <div className="bg-purple-800 rounded-lg font-bold text-center w-44 h-12">
                  <button className="py-3" type="submit">
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div>
            <Image
              src="/kunci.png"
              alt="Picture of the author"
              width="540"
              height="0"
              objectFit="cover" // change to suit your needs
              className="scale-100  mr-24" // just an example
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
