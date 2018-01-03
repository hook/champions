import { TYPE, TYPE_VALUES } from './model/Type';
import Champion, { CHAMPION } from './model/Champion';

export const WILLPOWER_SAFE_CHAMPIONS = [
    CHAMPION.BLACKBOLT, CHAMPION.CAPTAINMARVEL, CHAMPION.DRAX, CHAMPION.GAMORA, CHAMPION.GROOT, CHAMPION.KAMALAKHAN, CHAMPION.MSMARVEL, CHAMPION.RONAN, CHAMPION.SUPERIORIRONMAN, CHAMPION.THOR, CHAMPION.VENOM,
    CHAMPION.CIVILWARRIOR, CHAMPION.KANG, CHAMPION.ROCKET, CHAMPION.STARLORD, CHAMPION.VISION, CHAMPION.THEVISION,
    CHAMPION.COLOSSUS, CHAMPION.MAGNETO, CHAMPION.MAGNETOMARVELNOW, CHAMPION.STORM,
    CHAMPION.BLACKWIDOW,
    CHAMPION.CAPTAINAMERICAWWII, CHAMPION.ELECTRO, CHAMPION.HULK, CHAMPION.RHINO, CHAMPION.SHEHULK, CHAMPION.SPIDERGWEN, CHAMPION.SPIDERMANMORALES, CHAMPION.YELLOWJACKET,
    CHAMPION.DRSTRANGE, CHAMPION.GUILLOTINE, CHAMPION.JUGGERNAUT, CHAMPION.MAGIK, CHAMPION.SCARLETWITCH, CHAMPION.THORJANEFOSTER, CHAMPION.UNSTOPPABLECOLOSSUS,
].reduce((map, champion) => {
    map[ champion ] = true;
    return map;
}, {});

export const CHAMPION_PLACEHOLDER = new Champion({ uid: null, stars: 0 });

function typeId(typeId, champions) {
    return champions.map((champion) => ({
        ...champion,
        typeId,
    }));
}

function championStars(champion, stars) {
    return stars.map((stars) => ({
        ...champion,
        stars,
    }));
}

const champions = [
    ...typeId(TYPE.COSMIC, [
        ...championStars({ uid: CHAMPION.ANGELA }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.BLACKBOLT }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.CAPTAINMARVEL }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.CARNAGE }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.DRAX }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.GAMORA }, [ 1, 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.GROOT }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.GROOTKING }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.HELA }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.HYPERION }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.KAMALAKHAN }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.MSMARVEL }, [ 3, 4 ]),
        ...championStars({ uid: CHAMPION.PHOENIX }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.RONAN }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.SPIDERMANBLACK }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.SUPERIORIRONMAN }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.THANOS }, [ 4 ]),
        ...championStars({ uid: CHAMPION.THOR }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.VENOM }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.VENOMPOOL }, [ 2, 3, 4, 5 ]),
    ]),
    ...typeId(TYPE.TECH, [
        ...championStars({ uid: CHAMPION.CIVILWARRIOR }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.DROCTOPUS }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.GREENGOBLIN }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.HOWARDTHEDUCK }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.HULKBUSTER }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.IRONMAN }, [ 1, 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.IRONPATRIOT }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.KANG }, [ 4 ]),
        ...championStars({ uid: CHAMPION.NEBULA }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.PUNISHER2099 }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.ROCKET }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.SPIDERMANSTARK }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.STARLORD }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.VISION }, [ 1, 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.THEVISION }, [ 1, 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.ULTRON }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.ULTRONCLASSIC }, [ 5 ]),
        ...championStars({ uid: CHAMPION.VULTURE }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.WARMACHINE }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.YONDU }, [ 3, 4, 5 ]),
    ]),
    ...typeId(TYPE.MUTANT, [
        ...championStars({ uid: CHAMPION.ARCHANGEL }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.BEAST }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.CABLE }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.COLOSSUS }, [ 1, 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.CYCLOPS }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.CYCLOPS90S }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.DEADPOOL }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.DEADPOOLXFORCE }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.GAMBIT }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.ICEMAN }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.MAGNETO }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.MAGNETOMARVELNOW }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.NIGHTCRAWLER }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.PSYLOCKEXFORCE }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.ROGUE }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.STORM }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.WOLVERINE }, [ 1, 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.WOLVERINEOLDMAN }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.X23 }, [ 2, 3, 4, 5 ]),
    ]),
    ...typeId(TYPE.SKILL, [
        ...championStars({ uid: CHAMPION.AGENTVENOM }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.BLACKPANTHER }, [ 1, 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.BLACKPANTHERCIVILWAR }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.BLACKWIDOW }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.BLADE }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.CROSSBONES }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.DAREDEVIL }, [ 3, 4 ]),
        ...championStars({ uid: CHAMPION.DAREDEVILNETFLIX }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.ELEKTRA }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.FALCON }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.GWENPOOL }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.HAWKEYE }, [ 1, 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.KARNAK }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.KINGPIN }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.MEDUSA }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.MOONKNIGHT }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.PUNISHER }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.TASKMASTER }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.THORRAGNAROK }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.WINTERSOLDIER }, [ 2, 3, 4, 5 ]),
    ]),
    ...typeId(TYPE.SCIENCE, [
        ...championStars({ uid: CHAMPION.ABOMINATION }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.ANTMAN }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.CAPTAINAMERICA }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.CAPTAINAMERICAWWII }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.ELECTRO }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.HULK }, [ 1, 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.JOEFIXIT }, [ 3, 4 ]),
        ...championStars({ uid: CHAMPION.LUKECAGE }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.MODOK }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.QUAKE }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.REDHULK }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.RHINO }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.SHEHULK }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.SPIDERGWEN }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.SPIDERMAN }, [ 1, 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.SPIDERMANMORALES }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.YELLOWJACKET }, [ 2, 3, 4, 5 ]),
    ]),
    ...typeId(TYPE.MYSTIC, [
        ...championStars({ uid: CHAMPION.DRVOODOO }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.DORMAMMU }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.DRSTRANGE }, [ 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.DRSTRANGEMARVELNOW }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.GHOSTRIDER }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.GUILLOTINE }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.HOOD }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.IRONFIST }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.IRONFISTWHITE }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.JUGGERNAUT }, [ 1, 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.KARLMORDO }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.LOKI }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.MAGIK }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.MEPHISTO }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.MORNINGSTAR }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.SCARLETWITCH }, [ 1, 2, 3, 4 ]),
        ...championStars({ uid: CHAMPION.SCARLETWITCHULTIMATE }, [ 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.THORJANEFOSTER }, [ 2, 3, 4, 5 ]),
        ...championStars({ uid: CHAMPION.UNSTOPPABLECOLOSSUS }, [ 2, 3, 4, 5 ]),
    ]),
    ...typeId(TYPE.UNIVERSAL, [
        ...championStars({ uid: CHAMPION.MAESTRO }, [ 5 ]),
    ]),
].map((champion) => new Champion(champion));

const championTypeMap = TYPE_VALUES.map((type) => ({
    typeId: type,
    uids: [],
}));
const championMap = {};
const championTypes = {};
champions.forEach((champion) => {
    const { uid, typeId } = champion.attr;
    const typeMap = championTypeMap[ TYPE_VALUES.indexOf(typeId) ];
    if(typeMap && typeMap.uids.indexOf(uid) === -1) {
        typeMap.uids.push(uid);
    }
    championTypes[ uid ] = typeId;
    championMap[ champion.id ] = champion;
});

export default champions;
export { championMap, championTypes, championTypeMap };
