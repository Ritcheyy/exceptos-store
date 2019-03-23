import router from '../router'

export default function RedirectIfAuth(to, next) {
    let user = localStorage.getItem('user');

    if (user !== null) {
        router.push('/store');
    } else {
        next();
    }
};
