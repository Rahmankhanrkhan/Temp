import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker'
import { AsyncStorage } from "react-native";
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'access_error':
            return { ...state, errorMessage: action.payload };
        case 'clearMessage':
            return { ...state, errorMessage: '' }
        case 'signup':
            // console.log('action.payload:::',action.payload)
            return { errorMessage: '', token: action.payload.token }
        case 'userId':
            return { userId: action.payload }
        case 'signout':
            return { token: null, errorMessage: '' }
        default:
            return state
    }
};

const clearMessage = dispatch => () => {
    dispatch({ type: 'clearMessage' })
}

const localUserId = dispatch => async () => {
    const userId = await AsyncStorage.getItem('userId')
    console.log('USERID IN localUSER ID CONTEXT', userId)
    if (userId) {
        dispatch({ type: 'userId', payload: userId })
    } else {
        console.log()
    }
}

const localSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')
    console.log('LOCAL SIGN IN', token)
    if (token) {
        dispatch({ type: 'signup', payload: token })
        const accessId = token
        navigate('Index', ({ accessId }))
    } else {
        navigate('Signup')
    }
}

const signUp = dispatch => {
    return async ({ email, password, userId }) => {
        try {
            const response = await trackerApi.post('/signup', { email, password })
            // console.log('response.data:::', response.data)
            const token = response.data.token
            const userId = response.data.userId
            // console.log('USER ID Conntext', userId)
            await AsyncStorage.setItem('userId', userId)
            await AsyncStorage.setItem('token', token)

            dispatch({ type: 'signup', payload: { token, userId } })
            // const accessId = response.data.token
            // console.log('userId in COntext', userId)
            navigate('Index', { userId, token })
        }
        catch (err) {
            dispatch(
                {
                    type: 'access_error',
                    payload: 'Try'
                }
            )
        }
    }
}
const signIn = dispatch => {
    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signin', { email, password })
            // console.log('response.data:::', response.data)
            const token = response.data.token
            const userId = response.data.userId
            await AsyncStorage.setItem('token', token)
            dispatch({ type: 'signup', payload: { token, userId } })
            navigate('Index', ({ token }))
        }
        catch (err) {
            dispatch(
                {
                    type: 'access_error',
                    payload: 'Try'
                }
            )
        }
    }
}
const signOut = dispatch => async () => {
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'signout' })
    navigate('Signin')
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signUp, signIn, localUserId, signOut, clearMessage, localSignin },
    { token: null, errorMessage: '', userId: null }
)