function initPortfolio() {
    // load portfolio markdown
    setTimeout(() => {
        generatePortfolioFromGithub();
    });
};

function loadParticles() {
    setTimeout(() => {
        // load header nexus particles
        loadHeaderNexusParticles();

        // load bg space particles
        loadSpaceParticles();
    });
}