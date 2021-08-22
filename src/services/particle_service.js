const pathToConfig = "../../assets/particle_config/";
const headerParticleContainerId = "header-pjs";
const bodyParticleContainerId = "bg-space-pjs";

function getConfigPath(id) {
    switch (id) {
        case headerParticleContainerId:
            return pathToConfig +
                headerParticleContainerId +
                ".json";
        case bodyParticleContainerId:
            return pathToConfig +
                bodyParticleContainerId +
                ".json";
        default: break;
    }
}

function initParticleJs() {
    // load header nexus particles
    particlesJS.load(headerParticleContainerId, getConfigPath(headerParticleContainerId));

    // load bg space particles
    particlesJS.load(bodyParticleContainerId, getConfigPath(bodyParticleContainerId));
}