import { CHAMPION } from './model/Champion';


export const SPOTLIGHT = CHAMPION.HERCULES;
export const RATINGS = [ 1, 2, 3, 4, 5 ];
export const GRADES = [ 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'E', 'F' ];
export const RANGES = [
    'melee',
    'short',
    'medium',
    'long',
];
export const DAMAGE_TYPES = [
    'physical',
    'energy',
];
export const PROFILE_TYPES = [
    'email',
    'reddit',
    'kabam',
    'spotlight',
];

const guideUrlToName = (key) => key.replace('./', '').replace('.json', '');

const requireGuide = require.context('./guides', true, /\.json$/);
export const GUIDE_KEYS = requireGuide.keys().map(guideUrlToName);
export default requireGuide.keys().reduce((map, key) => {
    map[ guideUrlToName(key) ] = requireGuide(key);
    return map;
}, {});
