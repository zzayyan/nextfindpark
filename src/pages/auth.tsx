import axios from "axios";
import { Field, Form, Formik, FormikValues } from "formik";
import { NextPage } from "next";
import { getProviders, signIn, SignInResponse } from "next-auth/react";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";

const Auth: NextPage = ({ providers }: any) => {

    // Form changes based on AuthType, if Login show Login Form and vice versa
    const [authType, setAuthType] = useState("Login")
    const opAuthType: { [key: string]: string } = {
        Login: "Register",
        Register: "Login",
    }

    // Create a Component ProvidersButtons
    const ProviderButtons = ({ providers }: any) => (
        <div>
            {Object.values(providers).map(
                (provider: any) =>
                    provider.name !== "Credentials" && (
                        <button
                            key={provider.name}
                            onClick={() => {
                                signIn(provider.id, {
                                    callbackUrl: "http://localhost:3000"
                                })
                            }}
                        >
                            <p>Sign In with {provider.name}</p>
                        </button>
                    )
            )}
        </div>
    )

    const redirectToHome = () => {
        const router = Router
        const { pathname } = router
        if (pathname === "/auth") { router.push('/user') }
    }

    const registerNewUser = async (values: FormikValues) => {
        const res = await axios.post("api/register",
            JSON.stringify(values),
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            }
        ).then(async () => {
            await loginUser(values)
        }).catch(error => console.log(error))
        console.log(res)
    }

    const loginUser = async (values: FormikValues) => {
        const res: any = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: `${window.location.origin}`
        })

        res.error ? console.log(res.error) : redirectToHome()
    }

    const submitForm = async (values: FormikValues, actions: any) => {
        actions.setSubmitting(false)
        authType === "Login" ? await loginUser(values) : registerNewUser(values)
    }

    return (
        <>
            <div>
                <div className="container">
                    <p className="text-2xl">
                        {authType === "Login" ? "Not registered?" : "Already have an account?"}
                    </p>
                    <button onClick={() => setAuthType(opAuthType[authType])}>
                        {opAuthType[authType]}
                    </button>
                </div>

                {/* For Sign In Button with Another Provider */}
                <div>
                    <ProviderButtons providers={providers}></ProviderButtons>
                </div>
                <Formik
                    initialValues={{ username: '', email: '', password: '' }}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values, actions) => {
                        console.log("onSubmit")
                        submitForm(values, actions)
                    }}>
                    {(props) => (
                        <Form style={{ width: "100%" }}>
                            <div>
                                {/* Show Username Input if user want to register */}
                                {authType === "Register" && (
                                    <Field name="username">
                                        {() => (
                                            <div className="pb-5">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="rounded-lg w-96 text-black"
                                                    value={props.values.username}
                                                    onChange={props.handleChange}
                                                    placeholder="Username"
                                                />
                                            </div>
                                        )}
                                    </Field>
                                )}

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
                                <Field name="password">
                                    {() => (
                                        <div className="pb-5">
                                            <input
                                                type="password"
                                                name="password"
                                                className="rounded-lg w-96 text-black"
                                                value={props.values.password}
                                                onChange={props.handleChange}
                                                placeholder="Password"
                                            />
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <button type="submit">
                                {authType}
                            </button>
                        </Form>
                    )}

                </Formik>
            </div>
        </>

    );

}

export default Auth

export async function getServerSideProps() {
    return {
        props: {
            providers: await getProviders()
        }
    }
}