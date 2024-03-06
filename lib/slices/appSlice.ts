import { useState } from 'react'
import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    UnknownAction
} from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'
import { jwtObj, TaskStatus } from '../interfaces'

const initialState = {
    username: null as null | string,
    dataResp: null as null | any[],
    loading: false as boolean,
    errors: null as string[] | null,
    accessToken: null as string | null,
    filterStr: null as string | null,
    filterStatus: null as null | TaskStatus
}

type initialStateType = typeof initialState

export const appRegister = createAsyncThunk<
    string,
    { login: string; password: string },
    { rejectValue: string[] }
>(
    'app/register',
    async function (
        { login, password },
        { dispatch, getState, rejectWithValue }
    ) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/signup`,
                {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        username: login,
                        password: password
                    })
                }
            )

            if (response.status != 201) {
                const data = await response.json()

                if (data.message) {
                    console.log(typeof data.message, '1111111111111111')
                    if (typeof data.message == 'string') {
                        return rejectWithValue([data.message])
                    } else {
                        return rejectWithValue(data.message)
                    }
                } else {
                    return rejectWithValue(['Server Error!'])
                }
            }

            return 'Account created'
        } catch (error) {
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)

            localStorage.removeItem('accessToken')
            dispatch(setAccessToken(null))

            return rejectWithValue([message])
        }
    }
)

export const appLogin = createAsyncThunk<
    string,
    { login: string; password: string },
    { rejectValue: string[] }
>(
    'app/login',
    async function (
        { login, password },
        { dispatch, getState, rejectWithValue }
    ) {
        try {
            console.log(process.env)
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/signin`,
                {
                    method: 'POST',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        username: login,
                        password: password
                    })
                }
            )

            const data = await response.json()

            if (!response.ok || !data.accessToken) {
                localStorage.removeItem('accessToken')
                dispatch(setAccessToken(null))
                dispatch(setUsername(null))

                if (data.message) {
                    if (typeof data.message == 'string') {
                        return rejectWithValue([data.message])
                    } else {
                        return rejectWithValue(data.message)
                    }
                } else {
                    return rejectWithValue(['Server Error!'])
                }
            }

            localStorage.setItem('accessToken', data.accessToken)

            const decoded: jwtObj = jwtDecode(data.accessToken)

            dispatch(setUsername(decoded.username))

            return data.accessToken
        } catch (error) {
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)

            localStorage.removeItem('accessToken')
            dispatch(setAccessToken(null))

            return rejectWithValue([message])
        }
    }
)

export const appLogout = createAsyncThunk<
    boolean,
    undefined,
    { rejectValue: string[] }
>('app/logout', async function (_, { dispatch }) {
    localStorage.removeItem('accessToken')
    dispatch(setAccessToken(null))
    dispatch(setUsername(null))

    return true
})

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string | null>) {
            state.accessToken = action.payload
        },
        setUsername(state, action: PayloadAction<string | null>) {
            state.username = action.payload
        },
        setFilterStr(state, action: PayloadAction<string | null>) {
            state.filterStr = action.payload
        },
        setFilterStatus(state, action: PayloadAction<null | TaskStatus>) {
            state.filterStatus = action.payload
        },
        cleanAppSlice(state) {
            state.errors = null
            state.dataResp = null
            state.loading = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(appLogin.pending, state => {
                state.loading = true
                state.errors = null
                state.dataResp = null
            })
            .addCase(appLogin.fulfilled, (state, action) => {
                state.accessToken = action.payload
                state.loading = false
                state.dataResp = null
            })
            .addCase(appRegister.pending, state => {
                state.loading = true
                state.errors = null
                state.dataResp = null
            })
            .addCase(appRegister.fulfilled, (state, action) => {
                state.loading = false
                state.dataResp = [action.payload]
            })
            .addMatcher(isError, (state, action: PayloadAction<string[]>) => {
                state.errors = action.payload
                state.loading = false
                state.dataResp = null
            })
    }
})

export const {
    setAccessToken,
    setUsername,
    cleanAppSlice,
    setFilterStr,
    setFilterStatus
} = appSlice.actions

export default appSlice.reducer

function isError(action: UnknownAction) {
    return action.type.endsWith('rejected')
}
