/**
 * Init state
 */
import {state_init} from './init_state.js';

/**
 * Presentation states
 */
import {state_slide_0} from './state_slide_0.js';
import {state_slide_1} from './state_slide_1.js';
import {state_slide_2} from './state_slide_2.js';

/**
 * Ball states
 */
import {state_slide_ball} from './state_slide_ball.js';
import {state_ball_flying} from './state_ball_flying.js';

/**
 * Gun shot states
 */
import {state_take_gun} from './state_take_gun.js';
import {state_gun_shot_init} from './state_gun_shot_init.js';
import {state_gun_shot_0} from './state_gun_shot_0.js';

/**
 * Firework
 */
import {state_firework} from './state_firework.js';

export default [
    state_init,

    state_slide_0,
    state_slide_1,
    state_slide_2,

    state_slide_ball,
    state_ball_flying,

    state_take_gun,
    state_gun_shot_init,
    state_gun_shot_0,

    state_firework
];