export default function skipFrame() {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resolve();
            });
        });
    });
}
