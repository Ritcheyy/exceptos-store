import {store} from './store'

function notify (text, color = 'primary') {
    return store.dispatch("SET_SNACKBAR", {text:text, color: color, show: true});
}

export default notify
