function initPortfolio() {
    // load portfolio markdown
    setTimeout(() => {
        generatePortfolioFromGithub();
    });

    // load header nexus particles
    loadHeaderNexusParticles();

    // load bg space particles
    loadSpaceParticles();
};