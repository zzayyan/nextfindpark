import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { Navbar } from '@/components/navbar';
import { Maps } from '@/components/maps.';
const inter = Inter({ subsets: ['latin'] });

export default function ParkingDetails() {
  return (
    // Front End Parking Rate and Review
    <>
      <Head>
        <title>Detail Parkir</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className=" bg-white">
        <div className="flex px-10 py-10">
          <Maps />
          <div className="container pl-10">
            <div className=" py-2 px-5 rounded-xl bg-gray-300">
              <div className=" flex justify-center text-4xl font-bold text-black">
                <h1>PARKIRAN KUNING</h1>
              </div>
              <div className="py-2">
                <div className=" bg-blue-700">bar</div>
              </div>
              <div className="py-2">
                <div className=" bg-blue-700">bar</div>
              </div>
              <div className="py-2">
                <div className=" bg-blue-700">bar</div>
              </div>
              <div className="py-2">
                <div className=" bg-blue-700">bar</div>
              </div>
              <div className="py-2">
                <div className=" bg-blue-700">bar</div>
              </div>
              <div>
                <Komentar />
                <Komentar />
              </div>
              <div className="flex justify-between px-40">
                <div className="flex items-center rounded-full bg-blue-700 py-2 px-5">
                  <img src="/star.svg" alt="" />
                  <p className="text-xl">5</p>
                </div>
                <div className="flex items-center rounded-full text-xl bg-blue-700 py-2 px-5">
                  <a href="">BERI PENILAIAN</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export function Komentar() {
  return (
    <>
      <div className="pb-2">
        <div className="flex justify-between items-center text-black">
          <div className="w-10">
            <img src="/gambarprofile.svg" alt="" />
          </div>
          <div className="font-bold">
            <p>Nama Pengguna</p>
          </div>
          <div className="flex">
            <img src="/star.svg" alt="" />
            <img src="/star.svg" alt="" />
            <img src="/star.svg" alt="" />
            <img src="/star.svg" alt="" />
            <img src="/star.svg" alt="" />
          </div>
        </div>
        <div className="text-black">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error debitis corrupti laboriosam laborum sit magnam? Quis hic voluptatem, impedit, neque fuga maiores quae placeat ducimus vitae, beatae dolores aperiam quos.</p>
        </div>
      </div>
    </>
  );
}
