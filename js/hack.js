/**
 * Created by dingguoliang01 on 2014/10/10.
 */
window.addEventListener('message', function (e) {
    if (e.data && e.data.type) {
        if (e.data.type === 'toHack') {
            window.postMessage({type: 'toContent', config: window.er.controller.currentAction._editor.getValue()}, '*');
        }
    }
});
