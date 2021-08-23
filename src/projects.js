function initPortfolio() {
    // load project list markdown
    setTimeout(() => {
        generateProjectList();
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