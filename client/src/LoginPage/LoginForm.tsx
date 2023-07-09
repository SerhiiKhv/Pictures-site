import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {Input} from "../components/inputs/input";
import {Button} from "../components/Button";

type Variant = "REGISTER" | "LOGIN"

export const LoginForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLogin, setIsLogin] = useState(false)

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLogin(true)

        if (variant === "REGISTER") {
            //axios Register
        }

        if (variant === "LOGIN") {
            //NextAuth SignIn
        }
    }

    const socialAction = (action: string) => {
        setIsLogin(true)

        //NextAuth Social Sign In
    }

    return (
        <div className=" mt-8 sm:mx-auto sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">

                <form
                    className="space-y-6"
                    onSubmit={onSubmit}
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
                        errors={errors}/>

                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="password"
                        register={register}
                        errors={errors}/>

                    <div>
                        <Button
                            disabled={isLogin}
                            fullWidth
                            type={'submit'}>
                            {variant === "LOGIN" ? "Sign in" : "Register"}
                        </Button>
                    </div>

                </form>

                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === "LOGIN"? 'New to messenger?' : "Already have an account?"}
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