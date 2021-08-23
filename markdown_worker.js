if ('function' === typeof importScripts) {
    importScripts('./external/marked.min.js');

    // get readme markdown from https://github.com/hey24sheep/hey24sheep
    async function fetchMarkdownFromGithub() {
        let response = await fetch("https://raw.githubusercontent.com/hey24sheep/hey24sheep/main/README.md");
        return await response.text();
    }

    async function fetchProjectMarkdown() {
        let response = await fetch('../../assets/projects/projects.md');
        return await response.text();
    }

    async function fetchProjectsListMarkdown() {
        let response = await fetch('../../assets/projects/projects_list.md');
        return await response.text();
    }

    async function generatePortfolioFromGithub() {
        let markdownText = await fetchMarkdownFromGithub();
        const projectText = await fetchProjectMarkdown();

        // <!--{{int}}--> is added on github hey24sheep/readme.md which gets replaced with projects.md
        markdownText = markdownText.replace('<!--{{int}}-->', projectText);

        postMessage({ html: marked(markdownText) });
    }

    async function generateProjectList() {
        const markdownText = await fetchProjectsListMarkdown();
        postMessage({ html: marked(markdownText) });
    }

    onmessage = (e) => {
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