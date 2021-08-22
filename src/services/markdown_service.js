function generateMarkdownHTML(markdownText) {
    return marked(markdownText);
}

async function generatePortfolioFromGithub() {
    let markdownText = await fetchMarkdownFromGithub();
    const projectText = await fetchProjectMarkdown();

    // <!--{{int}}--> is added on github hey24sheep/readme.md which gets replaced with projects.md
    markdownText = markdownText.replace('<!--{{int}}-->', projectText);

    const html = generateMarkdownHTML(markdownText);
    document.getElementById('portfolio-content').innerHTML = html;
}

async function generateProjectList() {
    const projectText = await fetchProjectsListMarkdown();
    const html = generateMarkdownHTML(projectText);
    document.getElementById('portfolio-content').innerHTML = html;
}
