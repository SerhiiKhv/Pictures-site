import React, {useCallback, useContext, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {Input} from "../components/inputs/input";
import {Button} from "../components/button/Button";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";

type Variant = "REGISTER" | "LOGIN"

export const LoginForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [redirect, setRedirect] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const {setUser} = useContext(UserContext)

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER")
        } else
            setVariant("LOGIN")
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { email, password } = data; // Отримання email та password з об'єкта data

        if (variant === "REGISTER") {
            try{
                await axios.post('account/register', data)
                alert("Ok")
            }catch(e){
                alert("Not ok")
            }
        }

        if (variant === "LOGIN") {
            try {
                const response = await axios.post('account/login', { email, password });
                const { data } = response;

                if (data.success) {
                    setUser(data.user);
                    setRedirect(true);
                } else {
                    setErrorMessage(response.data.errorMessage)
                }
            } catch (error) {
                alert("Error occurred");
            }
        }

    }

    if(redirect){
        return <Navigate to={"/"} />
    }

    return (
        <div className="mt-8 sm:mx-auto sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === "REGISTER" && (
                        <Input
                            id="name"
                            label="Name"
                            placeholder="name"
                            register={register}
                            errors={errors}/>
                    )}
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="name@email.com"
                        register={register}
                        errors={errors}
                        />

                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="password"
                        register={register}
                        errors={errors}/>

                    <div>
                        <h2 className="text-xl text-red-700 text-center">{errorMessage}</h2>
                    </div>
                    <div>
                        <Button
                            fullWidth
                            type={'submit'}>
                            {variant === "LOGIN" ? "Sign in" : "Register"}
                        </Button>
                    </div>

                </form>

                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === "LOGIN" ? 'New to messenger?' : "Already have an account?"}
                    </div>

                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === "LOGIN" ? "Create an account" : "Login"}

                    </div>
                </div>
            </div>
        </div>
    )
}