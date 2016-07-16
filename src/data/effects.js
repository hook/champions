import Effect, { EFFECT } from './model/Effect';

export const EFFECT_STARS_AMOUNT = {
    [ EFFECT.ATTACK ]: [ 4, 5, 6 ],
    [ EFFECT.IDOL ]: [ 3, 4, 5 ],
    [ EFFECT.INSEPARABLE ]: [ 7, 8, 9 ],
    [ EFFECT.MUTANT_AGENDA ]: [ 8, 10, 12 ],
    [ EFFECT.CRITICAL_RATE ]: [ 5, 6, 7 ],
    [ EFFECT.CRITICAL_DAMAGE ]: [ 15, 20, 25 ],
    [ EFFECT.BLEED ]: [ 15, 20, 25 ],
    [ EFFECT.STUN_ACTIVATION ]: [ 5, 10, 15 ],
    [ EFFECT.STUN_SPECIAL ]: [ 15, 20, 25 ],
    [ EFFECT.POWER_GAIN ]: [ 3, 4, 5 ],
    [ EFFECT.PERFECT_BLOCK ]: [ 3, 4, 5 ],
    [ EFFECT.BLOCK ]: [ 10, 15, 20 ],
    [ EFFECT.ARMOR ]: [ 5, 6, 7 ],
    [ EFFECT.HEALTH ]: [ 4, 5, 6 ],
    [ EFFECT.HEROES_FOR_HIRE ]: [ 3, 4, 5 ],
    [ EFFECT.THUNDERBOLTS ]: [ 4, 5, 6 ],
};
export const EFFECT_STARS_INDEX = { 1: 0, 2: 0, 3: 1, 4: 2, 5: 2 };

const effects = [

    { uid: EFFECT.ATTACK },
    { uid: EFFECT.IDOL },
    { uid: EFFECT.INSEPARABLE },
    { uid: EFFECT.MUTANT_AGENDA },
    { uid: EFFECT.CRITICAL_RATE },
    { uid: EFFECT.CRITICAL_DAMAGE },
    { uid: EFFECT.BLEED },
    { uid: EFFECT.STUN_ACTIVATION },
    { uid: EFFECT.STUN_SPECIAL },
    { uid: EFFECT.POWER_GAIN },
    { uid: EFFECT.PERFECT_BLOCK },
    { uid: EFFECT.BLOCK },
    { uid: EFFECT.ARMOR },
    { uid: EFFECT.HEALTH },
    { uid: EFFECT.HEROES_FOR_HIRE },
    { uid: EFFECT.THUNDERBOLTS },

].map(({ uid }) => new Effect({
    uid,
    base: EFFECT_STARS_AMOUNT[ uid ][ 0 ],
}));

const effectIcons = {
    [ EFFECT.ATTACK ]: 'effect-attack',
    [ EFFECT.IDOL ]: 'effect-idol',
    [ EFFECT.INSEPARABLE ]: 'effect-inseparable',
    [ EFFECT.MUTANT_AGENDA ]: 'effect-mutant-agenda',
    [ EFFECT.CRITICAL_RATE ]: 'effect-critical-rate',
    [ EFFECT.CRITICAL_DAMAGE ]: 'effect-critical-damage',
    [ EFFECT.BLEED ]: 'effect-bleed',
    [ EFFECT.STUN_ACTIVATION ]: 'effect-stun',
    [ EFFECT.STUN_SPECIAL ]: 'effect-stun',
    [ EFFECT.POWER_GAIN ]: 'effect-power',
    [ EFFECT.POWER_STEAL ]: 'effect-power-steal',
    [ EFFECT.PERFECT_BLOCK ]: 'effect-perfect-block',
    [ EFFECT.BLOCK ]: 'effect-block',
    [ EFFECT.ARMOR ]: 'effect-armor',
    [ EFFECT.HEALTH ]: 'effect-health',
    [ EFFECT.HEALTH_STEAL ]: 'effect-health-steal',
    [ EFFECT.HEROES_FOR_HIRE ]: 'effect-heroes-for-hire',
    [ EFFECT.THUNDERBOLTS ]: 'effect-thunderbolts',
    [ EFFECT.MASTERMIND ]: 'effect-mastermind',
};

function effectIcon(uid) {
    return effectIcons[ uid ] || 'circle';
}

const effectBases = effects.reduce((map, { attr }) => {
    map[ attr.uid ] = attr.base;
    return map;
}, {});
function effectBase(uid) {
    return effectBases[ uid ];
}

export { effectIcon, effectBase };
export default effects;
