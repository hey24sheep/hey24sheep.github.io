
const markdownUrl = "https://raw.githubusercontent.com/hey24sheep/hey24sheep/main/README.md";

// get readme markdown from https://github.com/hey24sheep/hey24sheep
async function fetchMarkdownFromGithub() {
    let response = await fetch(markdownUrl);
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