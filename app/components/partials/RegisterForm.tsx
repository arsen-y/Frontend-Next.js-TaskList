'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { appLogin, appRegister } from '@/lib/slices/appSlice'
import ButtonAlt from '../ui/ButtonAlt'
import Header1 from '../ui/Header1'
import { useRouter } from 'next/navigation'
import React, { memo, useEffect, useRef, useState } from 'react'
import Lnk from '../ui/Lnk'
import ErrorsBlock from '../ui/ErrorsBlock'
import ErrorBlock from '../ui/ErrorBlock'
import Paragraph from '../ui/Paragraph'

const RegisterForm = () => {
    const router = useRouter()

    const dispatch = useAppDispatch()
    const { loading, errors, dataResp } = useAppSelector(state => state.app)

    const loginRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (dataResp !== null && loginRef.current && passwordRef.current) {
            loginRef.current.value = ''
            passwordRef.current.value = ''
        }
    }, [dataResp])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const form = event.currentTarget
        const formData: FormData = new FormData(form as HTMLFormElement)

        const { login, password } = Object.fromEntries(formData)

        if (!login || !password) return

        dispatch(
            appRegister({ login, password } as {
                login: string
                password: string
            })
        )
    }

    return (
        <>
            <div className='w-full rounded-lg bg-gray-200 shadow dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
                <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
                    <Header1>Register form</Header1>

                    <form
                        className='space-y-4 md:space-y-6'
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor='login'
                                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Your login
                            </label>
                            <input
                                type='text'
                                name='login'
                                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                                placeholder='username'
                                ref={loginRef}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='password'
                                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                            >
                                Password
                            </label>
                            <input
                                type='password'
                                name='password'
                                placeholder='••••••••'
                                className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                                ref={passwordRef}
                            />
                        </div>

                        <ButtonAlt type='submit' disabled={loading}>
                            Sign up
                        </ButtonAlt>

                        {errors && (
                            <ErrorsBlock>
                                {errors.map((error: string) => (
                                    <ErrorBlock key={Math.random().toString()}>
                                        {error}
                                    </ErrorBlock>
                                ))}
                            </ErrorsBlock>
                        )}

                        {dataResp && <Paragraph>{dataResp}</Paragraph>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default memo(RegisterForm)
