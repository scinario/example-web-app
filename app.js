// Register Service Worker just for installability
if (navigator.serviceWorker) {
    try {
        navigator.serviceWorker.register('serviceworker.js', { scope: '/'});
        console.info('Service worker registered');
    } catch (error) {
        console.warn(`Registration failed: ${error}`);
    }
}