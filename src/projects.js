function initPortfolio() {
    // load project list markdown
    setTimeout(() => {
        generateProjectList();

        // load header nexus particles
        loadHeaderNexusParticles();

        // load bg space particles
        loadSpaceParticles();
    });
};