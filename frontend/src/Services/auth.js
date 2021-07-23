import jwt from 'jwt-decode'

export const login = () => {
    const token = localStorage.getItem('jwt-token')
        if(!token) {return false}
        if(!token.length < 0) {return false}
        try{
            const decode = jwt(token)
            if(!decode){
                return false
            }                              
            return true            
        } catch(error){
            return false
        }
}

export const isLogin = () => {
    const token = localStorage.getItem('jwt-token')
    const decode = jwt(token)
    if(!decode){
        return false
    }                              
    return true 
}

export const logout = () => {
    localStorage.removeItem('jwt-token')
    localStorage.removeItem('id')
}
