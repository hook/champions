import { requestRedraw } from '../util/animation';
import { TYPE } from '../data/model/Type';

/**
  * Image constants.
  */
export IMAGE_STAR from '../images/badges/star.png';
export IMAGE_STAR_AWAKENED from '../images/badges/star-awakened.png';

export IMAGE_BADGE_ARENA from '../images/badges/arena.png';
export IMAGE_BADGE_QUEST from '../images/badges/quest.png';
export IMAGE_BADGE_ALLIANCE_QUEST from '../images/badges/alliance-quest.png';
export IMAGE_BADGE_ALLIANCE_WAR from '../images/badges/alliance-war.png';

export IMAGE_BADGE_RANK_UP from '../images/badges/rank-up.png';
export IMAGE_BADGE_LEVEL_MAX from '../images/badges/max.png';

export IMAGE_CURRENCY_GOLD from '../images/currency/gold.png';

export const IMAGE_EMPTY = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

/**
  * Get the cached image or fetch, redraw once we get it.
  */
const images = {};

export function getImage(src) {
    let image = images[ src ];
    if(!image) {
        image = new Image();
        image.loaded = null;
        image.addEventListener('load', () => {
            image.loaded = true;
            requestRedraw(5);
        });
        image.addEventListener('error', () => {
            image[ src ] = null;
        });
        image.src = `${ src }`;
        images[ src ] = image;
    }
    return image.loaded && image;
}

/**
 * Get catalyst images.
 */
const catalystImages = {};
[ 'alpha', 'basic', TYPE.COSMIC, TYPE.TECH, TYPE.MUTANT, TYPE.SKILL, TYPE.SCIENCE, TYPE.MYSTIC ].forEach((type) => {
    [ 1, 2, 3, 4, 5, 6 ].forEach((tier) => {
        catalystImages[ `tier-${tier}-${type}` ] = require(`../images/catalysts/tier_${tier}_${type}.png`);
    });
});

export function getCatalystImage(uid) {
    return catalystImages[ uid ];
}
