import * as R from 'rodin/core';

Math.randomFloatIn = (a = 0, b = 1) => {
    return Math.random()*(b-a)+a;
};

/**
 * Snowing Effect class. Requires a snowflake image url.
 * @param {int} [id = 0] - an ID for general purpose.
 * @param {!string} textureURL - URL string for the snowflake texture.
 * @param {number} [areaSize = 15] - size of the box snowing environment.
 * @param {number} [particleSize = 0.02] - snow flake size in centimeters.
 * @param {number} [density = 3] - number of snow flakes in a 1x1x1m box.
 * @param {number} [windSpeed = 0.5] - speed of wind on X axis in meter/sec.
 * @param {number} [gravity = 1] - gravity.
 */
export class Snow extends R.Sculpt {
    constructor(areaSize = 15.0,
                particleSize = 0.02,
                density = 5,
                windSpeed = 0.5,
                gravity = 1) {

        let speedFactor = 50;
        windSpeed /= speedFactor;
        gravity /= speedFactor;

        let particleCount = density * Math.pow(areaSize, 3);
        let particles = new THREE.Geometry();

        // initial speed/gravity values, to be used when resetting.
        let initialWindSpeed = windSpeed;
        let initialGravity = gravity;

        // indicated that the speed/gravity properties have been changed
        // and the particle velocities need to be recalculated.
        let needsReset = false;

        let flakeTexture = new THREE.TextureLoader().load('/public/resource/images/particle_snow.png');

        const material = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: particleSize,
            map: flakeTexture,
            transparent: true,
            opacity: 0.7
        });

        // resetting particles velocity to the current value
        let resetVelocityX = (velocity) => {
            velocity.x = -Math.randomFloatIn(0.4, 1) * windSpeed;
        };
        let resetVelocityY = (velocity) => {
            velocity.y = -Math.randomFloatIn(0.4, 1) * gravity;
        };
        let resetVelocityZ = (velocity) => {
            velocity.z = (0.5 - Math.random()) * 0.0005;
        };

        let count = particleCount;
        while (count--) {
            let px = Math.random() * areaSize - areaSize / 2,
                py = Math.random() * areaSize - areaSize / 2,
                pz = Math.random() * areaSize - areaSize / 2;

            let particle = new THREE.Vector3(px, py, pz);
            particle.velocity = new THREE.Vector3(0, 0, 0);

            resetVelocityX(particle.velocity);
            resetVelocityY(particle.velocity);
            resetVelocityZ(particle.velocity);

            particles.vertices.push(particle);
        }

        let pointCloud = new THREE.Points(particles, material);

        pointCloud.sortParticles = true;
        super(pointCloud);

        this.on("update", (evt) => {
            let count = particleCount;
            let resetVelocities = needsReset;
            let boundary = areaSize / 2;

            while (count--) {
                let particle = particles.vertices[count];

                if (particle.x < -boundary) {
                    particle.x = boundary;
                    resetVelocityX(particle.velocity);
                }
                else if (particle.x > boundary) {
                    particle.x = -boundary;
                    resetVelocityX(particle.velocity);
                }

                if (particle.y < -boundary) {
                    particle.y = boundary;
                    resetVelocityY(particle.velocity);
                }
                else if (particle.y > boundary) {
                    particle.y = -boundary;
                    resetVelocityY(particle.velocity);
                }

                if (particle.z < -boundary || particle.z > boundary) {
                    particle.z = 0;
                    resetVelocityZ(particle.velocity);
                }

                particle.add(particle.velocity);

                if (resetVelocities) {
                    resetVelocityX(particle.velocity);
                    resetVelocityY(particle.velocity);
                    resetVelocityZ(particle.velocity);
                }
            }

            needsReset = false;
            pointCloud.geometry.__dirtyVertices = true;
            pointCloud.geometry.verticesNeedUpdate = true;
        });

        /**
         * Get the wind speed.
         * @return {number} - the wind speed value in m/s.
         */
        this.getWindSpeed = () => {
            return windSpeed * speedFactor;
        };

        /**
         * Get the gravity.
         * @return {number} - the gravity value.
         */
        this.getGravity = () => {
            return gravity * speedFactor;
        };

        /**
         * Change the wind speed.
         * @param {number} [w = windSpeed] - the wind speed in m/s.
         */
        this.setWindSpeed = (w = windSpeed * speedFactor) => {
            initialWindSpeed = windSpeed = w / speedFactor;
            needsReset = true;
        };

        /**
         * Change the gravity.
         * @param {number} [g = gravity] - the gravity.
         */
        this.setGravity = (g = gravity * speedFactor) => {
            initialGravity = gravity = g / speedFactor;
            needsReset = true;
        };

        /**
         * Change the wind speed and the gravity by the multiplication of current values.
         * E.g. if the current values are 1.8 and 1.5 accordingly,
         * the changeSpeed(0.5, 3) will set the gravity to 0.9 and the wind speed to 4.5m/s.
         * @param {number} [g = 1] - current value of gravity * g.
         * @param {number} [w = 1] - current speed of wind * w.
         */
        this.changeSpeed = (g = 1, w = 1) => {
            gravity = initialGravity * g;
            windSpeed = initialWindSpeed * w;
            needsReset = true;
        };
    }
}