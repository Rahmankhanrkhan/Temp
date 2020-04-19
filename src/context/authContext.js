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
            return { errorMessage: '', token: action.payload }
        case 'signout':
            return { token: null, errorMessage: '' }
        default:
            return state
    }
};

const clearMessage = dispatch => () => {
    dispatch({ type: 'clearMessage' })
}

const localSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
        dispatch({ type: 'signup', payload: token })
        const accessId = token
        navigate('Index', ({ accessId }))
    } else {
        navigate('Signup')
    }
}

const signUp = dispatch => {
    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signup', { email, password })
            // console.log('response.data:::', response.data)
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({ type: 'signup', payload: response.data.token })
            const accessId = response.data.token
            navigate('Index', ({ accessId }))
        }
        catch (err) {
            dispatch(
                {
                    type: 'access_error',
                    payload: 'Try '
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
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({ type: 'signup', payload: response.data.token })
            const accessId = response.data.token
            navigate('Index', ({ accessId }))
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
    { signUp, signIn, signOut, clearMessage, localSignin },
    { token: null, errorMessage: '' }
)