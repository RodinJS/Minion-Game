let sounds = [
    {
        name: 'gunShotSound',
        file: '/public/sounds/Gun_Shoot.mp3'
    },
    {
        name: 'hoverBoardSound',
        file: '/public/sounds/Hover_Board_(loop).mp3'
    },
    {
        name: 'waterGunLoadingSound',
        file: '/public/sounds/Gun_Loading.mp3'
    },
    {
        name: 'scaleSound',
        file: '/public/sounds/Balloon_Stretch_(short).mp3'
    },
    {
        name: 'balloonBounceSound',
        file: '/public/sounds/Balloon_Bounce.mp3'
    },
    {
        name: 'fireWorkSound',
        file: '/public/sounds/Fireworks_Multiple.mp3'
    },
    {
        name: 'minionsWow',
        file: '/public/sounds/Minins_Wow.mp3'
    },
    {
        name: 'minionsScream',
        file: '/public/sounds/Minion_Scream.mp3'
    },
    {
        name: 'minionsNoise',
        file: '/public/sounds/Minions_Noise.mp3'
    },
    {
        name: 'minionLaughing',
        file: '/public/sounds/Minion_Laughing.mp3'
    },
];
class AudioControll {
    constructor() {
        this.enabled = true;
        this.preloadedSounds = {};
    }

    playPreloadSound() {
        if (this.enabled) {
            sounds.map(i => {
                this.preloadedSounds[i.name] = new Audio(i.file);
            });
        }
    }

    play(name) {
        if (this.preloadedSounds[name]) {
            this.preloadedSounds[name].play()
        }
    }
}
export const audio = new AudioControll();
// export const gunShotSound = new Audio('/public/sounds/Gun_Shoot.mp3');

// export const hoverBoardSound = new Audio('/public/sounds/Hover_Board_(loop).mp3');

// export const waterGunLoadingSound = new Audio('/public/sounds/Gun_Loading.mp3');

// export const shuttingSound = new Audio('/public/sounds/shoot.mp3');

// export const scaleSound = new Audio('/public/sounds/Balloon_Stretch_(short).mp3');

// export const balloonBounceSound = new Audio('/public/sounds/Balloon_Bounce.mp3');

// export const fireWorkSound = new Audio('/public/sounds/Fireworks_Multiple.mp3');

// export const minionsWow = new Audio('/public/sounds/Minins_Wow.mp3');

// export const minionsScream = new Audio('/public/sounds/Minion_Scream.mp3');

// export const minionsNoise = new Audio('/public/sounds/Minions_Noise.mp3');

// export const minionLaughing = new Audio('/public/sounds/Minion_Laughing.mp3');