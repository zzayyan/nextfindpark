import Navbar from "@/components/navbar";
import axios from "axios";
import { Field, Form, Formik, FormikValues } from "formik";
import { NextPage } from "next";
import { Main } from "next/document";
import Head from "next/head";
import Image from "next/image";

const ForgotPassword: NextPage = () => {
	const forgotPassword = async (values: FormikValues, actions: any) => {
		actions.setSubmitting(false);

		const res = await axios
			.post("api/auth/forgot-password", JSON.stringify(values), {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.catch((error) => console.log(error));
		console.log(res);
	};

	return (
		<>
			<Navbar />
			<Head>
				<title>Change Password</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="p-36 flex items-center justify-between flex-col-2 min-h-screen bg-white">
				<div className="">
					<div>
						<p className="text-5xl text-amber-900 pb-5 font-bold">
							Lupa Password
						</p>
						<p className="text-xl text-black pb-7">
							Masukkan email yang didaftarkan
						</p>
					</div>
					<div>
						<Formik
							initialValues={{ email: "" }}
							validateOnChange={false}
							validateOnBlur={false}
							onSubmit={(values, actions) => {
								console.log("onSubmit");
								forgotPassword(values, actions);
							}}
						>
							{(props) => (
								<Form style={{ width: "100%" }}>
									<div>
										<Field name="email">
											{() => (
												<div className="pb-5">
													<input
														type="email"
														name="email"
														className="rounded-lg w-96 text-black"
														value={props.values.email}
														onChange={props.handleChange}
														placeholder="Email"
													/>
												</div>
											)}
										</Field>
									</div>
									<div className="bg-purple-800 rounded-lg font-bold text-center w-44 h-12">
										<button className="py-3" type="submit">
											Kirim
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
				<div>
					<Image
						src="/kunci.png"
						alt="Picture of the author"
						width="270"
						height="0"
						objectFit="cover" // change to suit your needs
						className="scale-100  mr-24" // just an example
					/>
				</div>
			</main>
		</>
	);
};

export default ForgotPassword;
