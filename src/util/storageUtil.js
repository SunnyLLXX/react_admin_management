import store from 'store'

const USER_KEY = 'user_key'
const storageUtil = {
    //保存user
    saveUser(user){
        //localStorage.setItem('user_key',JSON.stringify(user))
        store.set(USER_KEY, user)
    },
    //读取user
    getUser(){
        //return JSON.parse(localStorage.getItem('user_key') || '{}')
        return store.get(USER_KEY) || {}
    },
    //删除user
    removeUser(){
        //localStorage.removeItem('user_key')
        store.remove(USER_KEY)
    }
}

export default storageUtil