import router from '../router'
import notify from '../notify'
import {store} from '../store'

export default function Auth(to, next) {
    let user = localStorage.getItem('user');

    if (user == null){
        notify('Please Login first!');
        router.push('/login');
        setTimeout(() => store.dispatch("SET_SNACKBAR", {show: false}), 3000);
    } else {
        next();
    }
};
