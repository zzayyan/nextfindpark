import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Field, Form, Formik, FormikValues } from 'formik';
import { GetServerSidePropsContext } from 'next';
import prisma from 'lib/prisma';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { resizeImage } from '@/utils/image-resizer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
	userProfile: {
		fullname: string,
		photo: string,
		photo_url: string,
		user_id: string
	}
}

export default function Profile({ userProfile }: Props) {

	const [localImg, setLocalImg] = useState()
	const [image, setImage] = useState([])
	const hiddenImageInput: any = useRef(null)

	const session = useSession()

	useEffect(() => {
		console.log(localImg)
		console.log(image)
	}, [image, localImg])


	const handleImage = async (e: any) => {
		const reader = new FileReader()
		await resizeImage(e.target.files[0], 512, 512)
			.then(blob => {
				setLocalImg(blob as any)
				reader.readAsDataURL(blob)
				reader.onloadend = () => {
					setImage(reader.result as any)
				}
			})
	}

	// Upload user photo profile
	const uploadImage = async (e: any) => {
		e.preventDefault()
		const response = await axios.patch(`/api/users/profile/${userProfile.user_id}`, {
			photo: image
		}).then((r) => {
			console.log(r)
			toast.success("Foto profil tersimpan!")
		}).catch((error) => {
			toast.error("Foto profil gagal tersimpan!")
		})
	}

	// Update user profile data
	async function updateProfile(values: FormikValues) {
		const response = await axios.put(`/api/users/profile/${userProfile.user_id}`,
			{
				fullname: values.fullname
			}
		).catch((error) => {
			toast.error("Gagal melakukan pembaruan data!")
		}).then((result) => {
			toast.success("Profil berhasil diperbarui!")
		})
	}

	// Update user password
	async function updatePassword(values: FormikValues) {
		const response = await axios.patch(`/api/users/${userProfile.user_id}/change-password`, {
			id: userProfile.user_id,
			oldPassword: values.oldPassword,
			newPassword: values.newPassword
		}).catch((error) => [
			toast.error(`Gagal memperbarui password`)
		]).then((result) =>  {
			toast.success("Berhasil memperbarui sandi!")
		})
	}

	// Delete user account
	async function deleteAccount() {
		const response = await axios.delete(`/api/users/${userProfile.user_id}`)
	}

	// Front End User Profile
	return (
		<>
			<Head>
				<title>Profil</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<ToastContainer/>
			<main className="">
				<div className="flex bg-white min-h-screen bg-gradient-to-r px-10 py-10 from-white to-blue-700">
					<div className="container">
						<div className="flex justify-center">
							<div>
								<div className='w-72 h-72 relative' >
									<Image className='rounded-full object-cover' fill sizes='50vw' priority={true} alt="User Profile Photo"
										src={(!localImg) ? (session.data?.user?.image) ? session.data.user.image : "/gambarprofile.svg" : URL.createObjectURL(localImg)} />
								</div>
								<input type="file" accept=".jpg, .jpeg, .png" onChange={handleImage} hidden={true} ref={hiddenImageInput} />

								{/* Button for Edit, Delete, and Save */}
								<button className='text-center' onClick={() => { hiddenImageInput?.current?.click() }}>
									Edit
								</button>
								{
									(localImg && image) &&
									(<div>
										<button onClick={() => { setLocalImg(undefined); setImage([]); hiddenImageInput.current.value = null }}>
											Delete
										</button>
										<button onClick={uploadImage}>
											Save
										</button>
									</div>)
								}

							</div>
						</div>
					</div>
					<div className="container text-black">
						<div>
							<Formik
								initialValues={{ fullname: userProfile.fullname }}
								validateOnChange={false}
								validateOnBlur={false}
								onSubmit={(values, actions) => {
									console.log("Update Profile")
									updateProfile(values)
									actions.setSubmitting(true)
								}}
							>
								{(props) => (
									<Form>
										<h3 className="text-4xl font-bold py-5">PROFIL</h3>
										<Field name="fullname" >
											{() => (
												<div className='text-black'>
													<input type="text" name="fullname" className="w-96 rounded-xl" value={props.values.fullname} onChange={(e) => props.handleChange(e)} placeholder="Nama" />
												</div>
											)}
										</Field>
										<Field>
											{() => (
												<div className="py-5">
													<input type="text" className="w-96 rounded-xl" placeholder="Program Studi" />
												</div>
											)}
										</Field>
										<Field>
											{() => (
												<div>
													<input type="text" className="w-96 rounded-xl" placeholder="Angkatan" />
												</div>
											)}
										</Field>
										<div className="py-5">
											<button type='submit' className="bg-blue-700 text-white px-10 py-2 font-bold rounded-xl">
												PERBARUI
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
					<div className="container bg-gray-300 rounded-xl text-black">
						<Formik
							initialValues={{ oldPassword: '', newPassword: '', confirmation: '' }}
							validateOnBlur={false}
							validateOnChange={true}
							validate={
								(values) => {
									const errors: any = {}
									if (values.newPassword && values.newPassword.length < 8) {
										errors.newPassword = 'Password is too short'
										console.log(errors)
									}

									if (values.confirmation && values.newPassword && values.newPassword !== values.confirmation) {
										errors.confirmation = 'Your confirmation password is not the same as before'
										console.log(errors)
									}
								}
							}
							onSubmit={(values, actions) => {
								console.log("Change Password")
								updatePassword(values)
							}}
						>
							{(props) => (
								<Form>
									<div className="flex justify-center text-4xl font-bold py-5">
										<h3>GANTI PASSWORD</h3>
									</div>
									<Field name="oldPassword">
										{() => (
											<div className="flex justify-center">
												<input type="password" name='oldPassword' className="w-96 rounded-xl" value={props.values.oldPassword} onChange={props.handleChange} placeholder="Kata Sandi Lama" />
											</div>
										)}
									</Field>
									<Field name="newPassword">
										{() => (
											<div className="flex justify-center py-5">
												<input type="password" name='newPassword' className="w-96 rounded-xl" value={props.values.newPassword} onChange={props.handleChange} placeholder="Kata Sandi Baru" />
											</div>
										)}
									</Field>
									<Field name="confirmation">
										{() => (
											<div className="flex justify-center">
												<input type="password" name='confirmation' className="w-96 rounded-xl" value={props.values.confirmation} onChange={props.handleChange} placeholder="Konfirmasi Kata Sandi Baru" />
											</div>
										)}
									</Field>

									<div className="flex justify-center py-5 font-bold text-white">
										<button type='submit' className="px-10 py-2 rounded-xl bg-blue-700">
											GANTI
										</button>
									</div>
								</Form>
							)}
						</Formik>

						<div className="flex justify-center font-bold text-4xl">
							<h3>HAPUS AKUN</h3>
						</div>
						<div className="flex justify-center py-5 font-bold text-white">
							<button onClick={() => {

							}} className="px-10 py-2 rounded-xl bg-blue-700">
								HAPUS
							</button>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);

}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const userId = (await getSession(context))?.user?.id

	const userProfile = await prisma.profile.findUnique({
		where: {
			user_id: userId
		}
	})

	let photo_url = null
	// try {
	//   const cldImage: any = await cloudinary.api.resource(userProfile?.photo as string)
	//     .then((result) => {
	//       console.log(result)
	//       photo_url = (JSON.parse(JSON.stringify(result))).secure_url
	//     })

	// } catch (error) {
	//   console.log(error)
	// }

	return {
		props: {
			userProfile: {
				...userProfile, photo_url
			}
		}
	}
}