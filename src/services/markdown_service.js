const markedWorker = new Worker('../markdown_worker.js');
const timeoutLimit = 30 * 1000; // 30 seconds
let markedTimeout;

markedWorker.onmessage = (e) => {
    clearTimeout(markedTimeout);
    document.getElementById('portfolio-content').innerHTML = e.data.html;
    markedWorker.terminate();
};

async function generatePortfolioFromGithub() {
    markedTimeout = setTimeout(() => {
        markedWorker.terminate();
        throw new Error('Marked took too long!');
    }, timeoutLimit);

    markedWorker.postMessage({ isMain: true });
}

async function generateProjectList() {
    markedTimeout = setTimeout(() => {
        markedWorker.terminate();
        throw new Error('Marked took too long!');
    }, timeoutLimit);

    markedWorker.postMessage({ isProjectList: true });
}
