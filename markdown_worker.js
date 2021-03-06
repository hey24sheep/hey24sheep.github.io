if ('function' === typeof importScripts) {
    importScripts('./external/marked.min.js');
    importScripts('./external/idbkvstore.min.js');
    let store;
    const currDate = new Date().toISOString();

    const lessThanOneHourAgo = (date) => {
        const HOUR = 1000 * 60 * 60;
        const anHourAgo = Date.now() - HOUR;

        return date > anHourAgo;
    }

    async function isIdbAvailable() {
        if (!indexedDB) {
            // treat as resolve to fallback to uncache mode
            return Promise.resolve(false);
        }
        // below code will check for private browsing
        var db = indexedDB.open("test");
        db.onerror = function () {
            // if private mode in firefox, it will fail
            // treat as resolve to fallback to uncache mode
            return Promise.resolve(false);
        };
        db.onsuccess = function () {
            return Promise.resolve(true);
        };
    }

    async function initIDBStore() {
        const _isIdbAvailable = await isIdbAvailable();
        if (_isIdbAvailable && IdbKvStore.INDEXEDDB_SUPPORT && !store) {
            store = new IdbKvStore('hey24sheep.com_cache', [], (err) => {
                store = null; // treat as null to fallback to uncache mode
                console.log('Unable to open IDB, error occured', err);
            });

            if (store) {
                store.on('error', (err) => {
                    console.log('Transaction error occured', err);
                });
            }
        } else {
            store = null; // treat as null to fallback to uncache mode
        }
    }

    async function isCacheExpired() {
        try {
            if (!store) {
                return true; // store unavailable, treat as expired
            }
            const value = await store.get('last_cache_dt');
            if (!value || (value && !lessThanOneHourAgo(new Date(value)))) {
                return true; // expired
            }
            return false; // not expired
        }
        catch (e) {
            console.log('worker : idb value retrieve failed, ', e);
            return true; // expired
        }
    }

    async function getValueSafe(key) {
        if (!store) {
            return null; // store unavailable, treat as null
        }
        const isExpired = await isCacheExpired();
        if (isExpired) {
            return null;
        }
        let cachedData;
        try {
            cachedData = await store.get(key);
        }
        catch (e) {
            console.log('worker : idb value retrieve failed, ', e);
        }
        return cachedData;
    }

    async function setValueSafe(key, data) {
        if (store) {
            try {
                await store.set(key, data);
                await store.set('last_cache_dt', currDate);
            }
            catch (e) {
                console.log('worker : idb value retrieve failed, ', e);
            }
        }
    }

    // get readme markdown from https://github.com/hey24sheep/hey24sheep
    async function fetchPortfolioMarkdown() {
        const cachedData = await getValueSafe('portfolio');
        if (cachedData) {
            return cachedData;
        }
        let response = await fetch('../../assets/README.md');
        if (response === null || response.body === null) {
            response = await fetch("https://raw.githubusercontent.com/hey24sheep/hey24sheep/main/README.md");
        }
        const d = await response.text();
        await setValueSafe('portfolio', d);
        return d;
    }

    async function fetchProjectMarkdown() {
        const cachedData = await getValueSafe('projects');
        if (cachedData) {
            return cachedData;
        }
        let response = await fetch('../../assets/projects/projects.md');
        const d = await response.text();
        await setValueSafe('projects', d);
        return d;
    }

    async function fetchProjectsListMarkdown() {
        const cachedData = await getValueSafe('projectsList');
        if (cachedData) {
            return cachedData;
        }
        let response = await fetch('../../assets/projects/projects_list.md');
        const d = await response.text();
        await setValueSafe('projectsList', d);
        return d;
    }

    async function generatePortfolioFromGithub() {
        let markdownText = await fetchPortfolioMarkdown();
        const projectText = await fetchProjectMarkdown();

        // <!--{{int}}--> is added on github hey24sheep/readme.md which gets replaced with projects.md
        markdownText = markdownText.replace('<!--{{int}}-->', projectText);

        let html = await getValueSafe('html_portfolio');

        if (!html) {
            html = marked(markdownText);
            await setValueSafe('html_portfolio', html);
        }

        postMessage({ html: html });
    }

    async function generateProjectList() {
        const markdownText = await fetchProjectsListMarkdown();
        let html = await getValueSafe('html_projectsList');

        if (!html) {
            html = marked(markdownText);
            await setValueSafe('html_projectsList', html);
        }

        postMessage({ html: html });
    }

    onmessage = (e) => {
        initIDBStore();

        if (e.data.isMain) {
            console.log("worker : ", e.data);
            generatePortfolioFromGithub();
        }

        if (e.data.isProjectList) {
            console.log("worker : ", e.data);
            generateProjectList();
        }
    };
}