import { UNRELEASED_CHAMPIONS } from '../data/champions/unreleased';
import CHAMPIONS from '../data/champions';
import SYNERGIES from '../data/synergies';
import { TYPE } from '../data/model/Type';
import { EFFECT } from '../data/model/Effect';
import router from '../service/router';
import roster from '../service/roster';
import Graph from './graph/Graph';
import ForceDirectedGraph from './graph/ForceDirectedGraph';
import deepEqual from 'deep-equal';
import { requestRedraw } from '../util/animation';

const TYPE_COLORS = {
    [ TYPE.COSMIC ]: '#3af',
    [ TYPE.TECH ]: '#23f',
    [ TYPE.MUTANT ]: '#fa0',
    [ TYPE.SKILL ]: '#f30',
    [ TYPE.SCIENCE ]: '#0a0',
    [ TYPE.MYSTIC ]: '#90f',
    [ TYPE.UNIVERSAL ]: '#3ff',
};

const EFFECT_COLORS = {
    [ EFFECT.ATTACK ]: '#f00',
    [ EFFECT.IDOL ]: '#f0a',
    [ EFFECT.INSEPARABLE ]: '#a00',
    [ EFFECT.MUTANT_AGENDA ]: '#ff0',
    [ EFFECT.COSMIC_SUPREMACY ]: '#66f',
    [ EFFECT.CRITICAL_RATE ]: '#fa0',
    [ EFFECT.CRITICAL_DAMAGE ]: '#a60',
    [ EFFECT.BLEED ]: '#f06',
    [ EFFECT.COMBO ]: '#600',
    [ EFFECT.LEGAL_DEFENSE ]: '#f66',
    [ EFFECT.STUN_SPECIAL ]: '#f60',
    [ EFFECT.POWER_GAIN ]: '#a0f',
    [ EFFECT.POWER_STEAL ]: '#a6f',
    [ EFFECT.ITS_COMPLICATED ]: '#60f',
    [ EFFECT.PERFECT_BLOCK ]: '#00a',
    [ EFFECT.ARMOR ]: '#0af',
    [ EFFECT.HEALTH ]: '#0f0',
    [ EFFECT.HEALTH_STEAL ]: '#af0',
    [ EFFECT.HEROES_FOR_HIRE ]: '#0a6',
    [ EFFECT.THUNDERBOLTS ]: '#a6a',
    [ EFFECT.MASTERMINDS ]: '#aaf',
    [ EFFECT.SHIELD_AGENTS ]: '#aa0',
    [ EFFECT.SHIELD_CLEARANCE ]: '#660',
    [ EFFECT.SHARED_GENETIC_MEMORY ]: '#000',
    [ EFFECT.DEMON_HUNTER ]: '#b00',
    [ EFFECT.SPIRIT_OF_JUSTICE ]: '#d50',
    [ EFFECT.HEIGHTENED_SENSES ]: '#005',
    [ EFFECT.COMPETITION ]: '#ea0',
    [ EFFECT.BANE_OF_HELLS_KITCHEN ]: '#f01',
    [ EFFECT.DEFENDERS_DESTROYER ]: '#c20',
    [ EFFECT.SPLIT_PERSONALITY ]: '#b0c',
    [ EFFECT.ELECTRIC_SUPERCHARGE ]: '#ff5',
    [ EFFECT.SEETHING_HATRED ]: '#4a2',
    [ EFFECT.ENGINEERING ]: '#00b',
    [ EFFECT.PARTICLE_PHYSICS ]: '#0fa',
    [ EFFECT.BIOCHEMISTRY ]: '#0a5',
    [ EFFECT.AVENGERS_TRYOUT ]: '#f51',
    [ EFFECT.KNOWLEDGE_SHARE ]: '#009',
    [ EFFECT.CONTEST_NOOBS ]: '#c09',
    [ EFFECT.MASTERS_OF_THE_SWORD ]: '#f11',
    [ EFFECT.SOUL_SEEKER ]: '#b7d',
    [ EFFECT.WARRIOR_QUEENS ]: '#fe1',
    [ EFFECT.BELIEVER ]: '#f91',
    [ EFFECT.CROSS_TRAINING ]: '#e11',
    [ EFFECT.LOYAL_MINISTER ]: '#ad1',
    [ EFFECT.TEAM_BUILDING_EXERCISE ]: '#fb2',
    [ EFFECT.LULLABY ]: '#a0a',
    [ EFFECT.OFF_LIMITS ]: '#0d0',
    [ EFFECT.PUNY_GOD ]: '#0df',
    [ EFFECT.OVERCOMING_FEAR ]: '#70f',
    [ EFFECT.LIKE_OLD_DAYS ]: '#fb0',
    [ EFFECT.NOT_AFRAID_OF_DEATH ]: '#a11',
    [ EFFECT.FRIEND_FROM_WORK ]: '#2a1',
    [ EFFECT.ADVANCED_IDEA_MECHANICS ]: '#df0',
    [ EFFECT.CHAIR_LARCENY ]: '#f30',
    [ EFFECT.IMMORTAL_SOULS ]: '#00d',
    [ EFFECT.QUEEN_OF_HEL ]: '#1d1',
    [ EFFECT.HELL_LORDS ]: '#f80',
    [ EFFECT.CUBICLE_MATES ]: '#8a4',
    [ EFFECT.OTHER_HALF ]: '#a35',
    [ EFFECT.THUNDER ]: '#982',
    [ EFFECT.PROFESSORS_IN_CRIME ]: '#22f',
    [ EFFECT.MOSTLY_AVERAGE_JOES ]: '#1df',
    [ EFFECT.TERMINATION_CONTRACT ]: '#f14',
    [ EFFECT.TEAM_DEADPOOL_AWESOME_FORCE ]: '#f01',
    [ EFFECT.ANNOYANCES_ASSEMBLE ]: '#0f0',
    [ EFFECT.BROKEN_MINDS ]: '#0fa',
    [ EFFECT.SIX_PACK ]: '#f02',
    [ EFFECT.XFORCE ]: '#999',
    [ EFFECT.WEAPON_X_STRIKE_TEAM ]: '#99f',
    [ EFFECT.CODE_RED_REVELATIONS ]: '#f13',
    [ EFFECT.MERCS_FOR_MONEY ]: '#ff4',
    [ EFFECT.BETTER_LUCK_NEXT_TIME ]: '#c86',
    [ EFFECT.COMPLICATED ]: '#a0b',
    [ EFFECT.ESOTERIC_INSIGHT ]: '#d4e',
    [ EFFECT.COVERT_INSIGHT ]: '#57d',
    [ EFFECT.FAMILIAR_INSIGHT ]: '#175',
    [ EFFECT.WAKANDAN_INSIGHT ]: '#3f5',
    [ EFFECT.AI_UPGRADE ]: '#f0b',
    [ EFFECT.ENHANCED_SOLDIERS ]: '#337',
    [ EFFECT.WAKANDA_LEADERSHIP ]: '#b74',
    [ EFFECT.FEARLESS ]: '#64c',
    [ EFFECT.MUTANT_PURSUIT ]: '#ef0',
    [ EFFECT.SKILL_TRAINING ]: '#d00',
    [ EFFECT.SCIENCE_RESEARCH ]: '#1f1',
    [ EFFECT.MYSTIC_OBSERVATION ]: '#90f',
    [ EFFECT.TECH_ADVANCEMENT ]: '#00a',
    [ EFFECT.CHRONAL_ANCHOR ]: '#51f',
    [ EFFECT.ENERGY_CONDUIT ]: '#dc0',
    [ EFFECT.DEMONS ]: '#666',
    [ EFFECT.PACT_WITH_A_DEMON ]: '#e21',
    [ EFFECT.INHUMAN_ROYAL_FAMILY ]: '#150',
    [ EFFECT.INSPIRATION ]: '#c01',
    [ EFFECT.GET_IN_THE_POOL ]: '#666',
    [ EFFECT.SPIRITUAL_STRENGTH ]: '#f50',
    [ EFFECT.PLAYING_WITH_FIRE ]: '#f60',
    [ EFFECT.TECH_BREAKTHROUGH ]: '#23f',
    [ EFFECT.MUTANT_EVOLUTION ]: '#fa0',
    [ EFFECT.SKILL_TRAINING_CAIW ]: '#f30',
    [ EFFECT.SCIENCE_EXPERIMENT ]: '#0a0',
    [ EFFECT.MYSTIC_CRAFT ]: '#90f',
    [ EFFECT.COSMIC_POWER ]: '#3af',
    [ EFFECT.ADVANCED_TECH ]: '#20f',
    [ EFFECT.HARD_TO_HIT ]: '#0f0',
    [ EFFECT.DEADLY_STING ]: '#f90',
    [ EFFECT.UNTAMED_FORCE ]: '#0a8',
    [ EFFECT.DECIMATION ]: '#c00',
    [ EFFECT.NO_MERCY ]: '#90e',
    [ EFFECT.FORMIDABLE_FOE ]: '#d00',
    [ EFFECT.MICROSCOPIC_OBSERVATION ]: '#505',
    [ EFFECT.THE_UNTOUCHABLES ]: '#aaf',
    [ EFFECT.UNMERCIFUL_PUNISHMENT ]: '#0af',
    [ EFFECT.ASGARDIAN_HUNT ]: '#fc0',
    [ EFFECT.SPECIAL_ASSIST ]: '#4b4',
    [ EFFECT.HUNT_THE_UNCANNY ]: '#fc0',
    [ EFFECT.CHALLENGE_DEFENSES ]: '#9bf',
    [ EFFECT.GRIPPED_BY_FEAR ]: '#224',
    [ EFFECT.ENGULFED_BY_THE_VOID ]: '#a00',
    [ EFFECT.ENCHANTED_BLADES ]: '#f85',
    [ EFFECT.LOST_DAUGHTERS_OF_ASGARD ]: '#5b8',
    [ EFFECT.WARRIORS_OF_ASGARD ]: '#c70',
    [ EFFECT.PIT_FIGHTERS ]: '#c53',
    [ EFFECT.GRANDMASTERS_CHAMPIONS ]: '#0a0',
    [ EFFECT.ELEMENTAL_HIDE ]: '#aaa',
    [ EFFECT.DARK_ILLUMINATI ]: '#83f',
    [ EFFECT.ETERNAL_ADVERSARIES ]: '#53f',
    [ EFFECT.HAIL_HYDRA ]: '#b10',
    [ EFFECT.DARK_EMPOWERMENT ]: '#333',
    [ EFFECT.METAL_MAYHEM ]: '#aaa',
    [ EFFECT.XASSASSINS ]: '#58d',
    [ EFFECT.SEEING_RED ]: '#e00',
    [ EFFECT.DEADLY_PRESENCE ]: '#70c',
    [ EFFECT.MEMORIES_OF_GENOSHA ]: '#d70',
    [ EFFECT.IMPENETRABLE_HIDE ]: '#888',
    [ EFFECT.ITS_COMPLICATED_2 ]: '#90a',
    [ EFFECT.PHOENIX_FORCE ]: '#fe0',
    [ EFFECT.TOUGH_BRAWLERS ]: '#4f5',
    [ EFFECT.PERSISTENT_FORCE ]: '#05f',
    [ EFFECT.COMBO_FIGHTER ]: '#fb0',
    [ EFFECT.DAVID_AND_GOLIATH ]: '#f33',
    [ EFFECT.COMBO_BREAKERS ]: '#369',
    [ EFFECT.WARRIORS_OF_THE_STARS ]: '#51f',
    [ EFFECT.FRIENDS ]: '#3af',
    [ EFFECT.SCHOOL_OF_HARD_ROCKS ]: '#662',
    [ EFFECT.WORTHY_OPPONENT ]: '#455',
    [ EFFECT.UNENDING_AMBITION ]: '#6a2',
    [ EFFECT.MADCAP_EXPERIMENTALISTS ]: '#7e9',
    [ EFFECT.TWISTED_ARCANISTS ]: '#853',
    [ EFFECT.LEGION_ACCURSED ]: '#6fb',
    [ EFFECT.GENETIC_RECODE_BARRIER ]: '#d7a',
    [ EFFECT.GENETIC_RECODE_SURVIVAL ]: '#f90',
    [ EFFECT.GENETIC_RECODE_HIVE_MIND ]: '#407',
    [ EFFECT.GENETIC_RECODE_REGENESIS ]: '#a88',
    [ EFFECT.GENETIC_RECODE_EVOLUTION ]: '#128',
    [ EFFECT.GENETIC_RECODE_AGGRESSION ]: '#440',
    [ EFFECT.GENETIC_RECODE_PROBABILITY ]: '#aea',
    [ EFFECT.GENETIC_RECODE_BLOODLETTING ]: '#2e3',
    [ EFFECT.MYSTIC_MASTERS ]: '#923',
    [ EFFECT.ANCIENT_HUNGER ]: '#549',
    [ EFFECT.SUPREME_SYMBIOSIS ]: '#000',
    [ EFFECT.MIDNIGHT_PURSUIT ]: '#3f8',
    [ EFFECT.JUSTICE_ON_WHEELS ]: '#bb5',
    [ EFFECT.CONTEST_TEAMMATES ]: '#e92',
    [ EFFECT.TACTICAL_TRAINING ]: '#951',
    [ EFFECT.DARK_JUSTICE ]: '#0a6',
    [ EFFECT.NIGHT_HAWKS ]: '#98e',
    [ EFFECT.BIRDS_OF_PREY ]: '#120',
    [ EFFECT.RUNS_IN_THE_FAMILY ]: '#b23',
    [ EFFECT.OLD_TEAMMATES ]: '#b98',
    [ EFFECT.UNCANNY_AVENGERS ]: '#490',
    [ EFFECT.GENETIC_MASTERPIECE ]: '#9e3',
    [ EFFECT.MUTANT_DOMINION ]: '#b57',
    [ EFFECT.BLOOD_LINES ]: '#062',
    [ EFFECT.MASTERMINDS_TWO ]: '#4ce',
    [ EFFECT.STOLEN_MEMORIES ]: '#aa1',
    [ EFFECT.PARTNERS_IN_SHIELD ]: '#c4a',
    [ EFFECT.MARVELOUS ]: '#852',
    [ EFFECT.FAN_CLUB ]: '#949',
    [ EFFECT.RESTORATION_KIT ]: '#94e',
    [ EFFECT.STRATEGIC_SABOTAGE ]: '#4ac',
    [ EFFECT.INCREASED_FIREPOWER ]: '#476',
    [ EFFECT.CONTINGENCY_PLAN ]: '#7e4',
    [ EFFECT.EXTREME_CONDITIONS_KIT ]: '#192',
    [ EFFECT.POWER_KIT ]: '#460',
    [ EFFECT.GWENOM_RISING ]: '#000',
    [ EFFECT.AGENTS_OF_SMASH ]: '#3f5',
    [ EFFECT.HUNTRESS_OF_THE_CONTEST ]: '#9d2',
    [ EFFECT.SIBLING_RIVALRY ]: '#28e',
    [ EFFECT.CYBERNETICS_UPGRADE_ASSAULT ]: '#d07',
    [ EFFECT.CYBERNETICS_UPGRADE_TACTICS ]: '#6b8',
    [ EFFECT.DOUBLE_NEGATIVE ]: '#858',
    [ EFFECT.CHALLENGER ]: '#83a',
    [ EFFECT.RAIN_OF_FIRE ]: '#db8',
    [ EFFECT.TURN_UP_THE_HEAT ]: '#0eb',
    [ EFFECT.A_SONG_OF_FIRE_AND_ICE ]: '#932',
    [ EFFECT.FAMILIAR_FACES ]: '#6a4',
    [ EFFECT.LAST_HOPE ]: '#5c7',
    [ EFFECT.UNLIKELY_COMBINATION ]: '#626',
    [ EFFECT.LIVE_AND_DIE_BY_THE_SWORD ]: '#918',
    [ EFFECT.MASTERLESS ]: '#498',
    [ EFFECT.LIEUTENANTS_OF_THE_BLACK_ORDER ]: '#a41',
    [ EFFECT.CULL_OF_THE_MAW ]: '#fc0',
    [ EFFECT.INVASIVE_FORCE ]: '#991',
    [ EFFECT.DISPLAY_OF_STRENGTH ]: '#845',
    [ EFFECT.HEROES_NEVER_LEARN ]: '#a9a',
    [ EFFECT.TIDE_TO_GO ]: '#a78',
    [ EFFECT.KINGS_OF_THE_WORLD ]: '#c04',
    [ EFFECT.BEACH_BODS ]: '#88c',
    [ EFFECT.FORCE_BLOCK ]: '#b2f',
    [ EFFECT.TILL_DEATH ]: '#119',
    [ EFFECT.UNPHASED ]: '#1de',
    [ EFFECT.ONE_WAY_OR_ANOTHER ]: '#27a',
    [ EFFECT.STARK_INTERNSHIP ]: '#e36',
    [ EFFECT.SPIDERMEN_IN_BLACK ]: '#001',
    [ EFFECT.BAD_FOR_BUSINESS ]: '#d52',
    [ EFFECT.CULTURE_SHOCK ]: '#c90',
    [ EFFECT.MINE_CAN_HOVER ]: '#b8e',
    [ EFFECT.ENCROACHING_INSANITY ]: '#85e',
    [ EFFECT.ENHANCED_ILLUSIONIST ]: '#6a9',
    [ EFFECT.MENTAL_IMMUNITY ]: '#3da',
    [ EFFECT.NEW_MUTANTS ]: '#f84',
    [ EFFECT.AIM_TECHNOLOGY ]: '#2dd',
    [ EFFECT.LEADING_AVENGERS ]: '#da5',
    [ EFFECT.SELFFRIENDS ]: '#d54',
    [ EFFECT.ROBOT_UPRISING ]: '#3e8',
    [ EFFECT.GOING_VIRAL ]: '#88c',
    [ EFFECT.FIRST_OF_HIS_NAME ]: '#7bc',
    [ EFFECT.DRY_ICE ]: '#ddf',
    [ EFFECT.SENIORS_DISCOUNT ]: '#a25',
    [ EFFECT.JUDGEMENT_DAY ]: '#de5',
    [ EFFECT.A_SPELL_A_DAY_KEEPS_THE_DOCTOR_AWAY ]: '#acd',
    [ EFFECT.FIRE_AND_FORGET ]: '#dd5',
    [ EFFECT.SPIDERS_BITE ]: '#1d6',
    [ EFFECT.FEARSOME_FOUR ]: '#a75',
    [ EFFECT.BANE_OF_EVIL ]: '#8d2',
    [ EFFECT.THINGS ]: '#335',
    [ EFFECT.MISUNDERSTOOD_MONSTERS ]: '#97e',
    [ EFFECT.AI_UPRISING ]: '#22d',
    [ EFFECT.OUR_SHARED_CURSE ]: '#a3d',
    [ EFFECT.HUNTING_PARTY ]: '#e02',
    [ EFFECT.BEAUTY_AND_THE_BEAST ]: '#fc5',
    [ EFFECT.FANTASTIC_RAGE ]: '#86a',
    [ EFFECT.ENHANCED_FORCEFIELD ]: '#cd5',
    [ EFFECT.GENIUS_INGENUITY ]: '#5f8',
    [ EFFECT.COSMIC_OVERLOAD ]: '#14f',
    [ EFFECT.SORCERY_REVERSAL ]: '#439',
    [ EFFECT.MYSTIC_TYRANTS ]: '#e31',
    [ EFFECT.HERBIE ]: '#ead',
    [ EFFECT.FANTASTIC_FOUR ]: '#22f',
    [ EFFECT.DO_US_PART ]: '#8ef',
    [ EFFECT.COLLEGE_RIVALS ]: '#ed9',
    [ EFFECT.SK_ASTRONOMY ]: '#3f8',
    [ EFFECT.SK_ROBOTICS ]: '#725',
    [ EFFECT.SK_GENETICS ]: '#9d4',
    [ EFFECT.HERALDS_OF_GALACTUS ]: '#73f',
    [ EFFECT.SECRET_DEFENDERS ]: '#d63',
    [ EFFECT.MINE_TRAVELS_THROUGH_SPACE ]: '#777',
    [ EFFECT.NEW_WARRIOR_BLOOD ]: '#d22',
    [ EFFECT.TOTAL_ANNIHILATION ]: '#af1',
    [ EFFECT.MAXIMUM_OUTPUT ]: '#71d',
    [ EFFECT.PHALANX_FEUD ]: '#b9d',
    [ EFFECT.FULL_SPEED_AHEAD ]: '#6d7',
    [ EFFECT.SUPERNANNY ]: '#e8c',
    [ EFFECT.DEADPOOLS_GUIDE_TO_SUPER_VILLAINS ]: '#b35',
    [ EFFECT.HARDWIRED_FOR_HEARTBREAK ]: '#22d',
    [ EFFECT.BEAT_UP_THE_UNIVERSE ]: '#5e8',
    [ EFFECT.MOJOVERSE ]: '#2e9',
    [ EFFECT.SMILE_FOR_THE_CAMERAS ]: '#bbb',
    [ EFFECT.WITHOUT_A_LEG_TO_STAND_ON ]: '#ec9',
    [ EFFECT.CROWD_PLEASERS ]: '#24d',
    [ EFFECT.CIVIL_WAR_STORIES ]: '#5d5',
    [ EFFECT.LOVE_TRIANGLES ]: '#d4c',
    [ EFFECT.PROBABLY_OP ]: '#38a',
    [ EFFECT.GOOD_VIBRATIONS ]: '#4ed',
    [ EFFECT.MONSTER_MASH ]: '#f3a',
    [ EFFECT.FANTASTIC_FIENDS ]: '#a7d',
    [ EFFECT.DEATH_AND_RESURRECTION ]: '#001',
    [ EFFECT.ELDERS_GAME ]: '#473',
    [ EFFECT.PRISONER ]: '#fa5',
    [ EFFECT.A_GANG_OF ]: '#45f',
    [ EFFECT.LAB_PARTNERS ]: '#5e3',
    [ EFFECT.TROPHY_CASE ]: '#da2',
    [ EFFECT.CHAMPIONS_OF_BATTLEWORLD ]: '#ae3',
    [ EFFECT.DOCTORS_STRANGE ]: '#b2c',
    [ EFFECT.MYSTIC_ARTS ]: '#4dc',
    [ EFFECT.BLUETIFUL_PEOPLE ]: '#45d',
    [ EFFECT.GAMMA_HORDE ]: '#4e5',
    [ EFFECT.HOUSE_OF_IRON ]: '#35f',
    [ EFFECT.SETUP_AND_SPIKE ]: '#9ed',
    [ EFFECT.UNDER_THE_WEATHER ]: '#445',
    [ EFFECT.KINGDOM_OF_WAKANDA ]: '#f12',
    [ EFFECT.SPIDERGUILD ]: '#3d2',
    [ EFFECT.FAMILY_REUNION ]: '#f55',
    [ EFFECT.EASTERN_BLOCKERS ]: '#a2e',
    [ EFFECT.LIVING_STEEL_CURTAIN ]: '#555',
    [ EFFECT.MAGNIFICENT_MANES ]: '#ae5',
    [ EFFECT.ENHANCED_WITH_CARBONADIUM ]: '#ade',
    [ EFFECT.REMEMBER_ME ]: '#8ae',
    [ EFFECT.REMEMBERING_BUDAPEST ]: '#cad',
    [ EFFECT.COVERT_EXPERTISE ]: '#21e',
    [ EFFECT.WEST_COAST_AVENGERS ]: '#7a5',
    [ EFFECT.FELINE_POSSESSION ]: '#26e',
    [ EFFECT.ENTREE ]: '#f95',
    [ EFFECT.BIG_GAME_HUNTERS ]: '#f24',
    [ EFFECT.NOT_THE_FACE ]: '#aff',
    [ EFFECT.SPIDER_MONKEY ]: '#ae2',
    [ EFFECT.FURRY_FRENEMIES ]: '#725',
    [ EFFECT.NO_EVIL ]: '#35a',
    [ EFFECT.ON_GUARD_FOR_THEE ]: '#f5ed02',
    [ EFFECT.ALPHA_FLIGHT ]: '#e61b05',
    [ EFFECT.EXCAVATORS ]: '#965102',
    [ EFFECT.JUST_HAIR_AND_THINGS ]: '#c27a10',
    [ EFFECT.GAMMA_RAY_RAY ]: '#29bd04',
    [ EFFECT.FURRY_BUDS ]: '#7e04c4',
    [ EFFECT.GIANT_CHALLENGERS ]: '#059974',
    [ EFFECT.COMMON_HISTORY ]: '#050147',
    [ EFFECT.NOVA_CORPS_VETERANS ]: '#2F4F4F',
    [ EFFECT.THE_HIGH_GROUND ]: '#7B68EE',
    [ EFFECT.THE_FIRST_ONE ]: '#00BFFF',
    [ EFFECT.BRINGER_OF_DEATH_I ]: '#4169E1',
    [ EFFECT.BRINGER_OF_DEATH_II ]: '#FFE4B5',
    [ EFFECT.BRINGER_OF_DEATH_III ]: '#808080',
    [ EFFECT.BRINGER_OF_DEATH_IV ]: '#DCDCDC',
    [ EFFECT.GUARDIAN_OF_THE_PYRAMID ]: '#4682B4',
    [ EFFECT.IMPENDING_STORM ]: '#BA55D3',
    [ EFFECT.YOUR_FATE_IS_MINE ]: '#FFA07A',
    [ EFFECT.CHAOTIC_ENERGY ]: '#DC143C',
    [ EFFECT.CROSSOVER ]: '#BDB76B',
    [ EFFECT.DEATHWISH ]: '#ADFF2F',
    [ EFFECT.GOODFELLA ]: '#D8BFD8',
    [ EFFECT.MERC_WITH_A_MOUTH ]: '#1E90FF',
    [ EFFECT.STUCK_IN_LIMBO ]: '#8B4513',
    [ EFFECT.DRUG_I ]: '#DAA520',
    [ EFFECT.DRUG_L ]: '#008080',
    [ EFFECT.DRUG_M ]: '#FFFACD',
    [ EFFECT.GATEWAY ]: '#9ACD32',
    [ EFFECT.HABITAT ]: '#8FBC8F',
    [ EFFECT.FIRST_CRUSH ]: '#00FFFF',
    [ EFFECT.FULL_METAL ]: '#FF8C00',
    [ EFFECT.NOT_SO_HIDDEN_DRAGON ]: '#228B22',
    [ EFFECT.STUDENT_LOANS ]: '#FF4500',
    [ EFFECT.MY_BROTHERHOOD ]: '#483D8B',
    [ EFFECT.MY_CONTEST_NOW ]: '#20B2AA',
    [ EFFECT.MY_HELLFIRE_CLUB ]: '#40E0D0',
    [ EFFECT.MY_METALLIC_ANTIPATHY ]: '#B22222',
    [ EFFECT.METALLIC_AFFINITY ]: '#7FFF00',
    [ EFFECT.REDEMPTION ]: '#B8860B',
    [ EFFECT.RISE_AGAINST_THE_CONTEST ]: '#D2691E',
    [ EFFECT.FAMILY_FEUD ]: '#0C53AE',
    [ EFFECT.HATRED ]: '#CE6A2D',
    [ EFFECT.OSBORN_TO_BE_WILD ]: '#931085',
    [ EFFECT.SELF_CENTERED ]: '#31CCEC',
    [ EFFECT.SYMBIOTE_CONSCIOUSNESS ]: '#827CE8',
    [ EFFECT.COSMIC_BANE_OF_EVIL ]: '#B49D23',
    [ EFFECT.COSMIC_JUSTICE_ON_WHEELS ]: '#ED81FB',
    [ EFFECT.PUNISHMENTS_OF_INFINITE_VARIETY ]: '#0E0AB5',
    [ EFFECT.SPIRITS_OF_VENGEANCE ]: '#68B933',
    [ EFFECT.FASTBALL_SPECIAL ]: '#F48A9B',
    [ EFFECT.FEEL_CYTORAKS_EMBRACE ]: '#DF231D',
    [ EFFECT.DONT_MENTION_PUNY_BANNER ]: '#9D649E',
    [ EFFECT.TECHNOLOGICAL_COMPETITION ]: '#3A8B1C',
    [ EFFECT.ENGINEERING_EXPERTS ]: '#E16483',
    [ EFFECT.IT_AINT_EASY ]: '#CF4392',
    [ EFFECT.SINGULARITY ]: '#778FE5',
    [ EFFECT.ENHANCED_ADAMANTIUM ]: '#C299F5',
    [ EFFECT.NO_NOT_YOU ]: '#00F4DB',
    [ EFFECT.THE_BRAVE_AND_THE_BOULDER ]: '#FA54F6',
    [ EFFECT.PASSIVE_AGGRESSIVE ]: '#58FB3E',
    [ EFFECT.ARACHNID_HUNTERS ]: '#05D278',
    [ EFFECT.ALPHA_FLIGHT_SPACE_STATION ]: '#08ccb2',
    [ EFFECT.GAMMA_MUTATES ]: '#3f730b',
    [ EFFECT.EXTREME_MEASURES ]: '#f5f107',
    [ EFFECT.HELL_AND_BACK ]: '#8f2313',
    [ EFFECT.FAIREST_OF_THEM_ALL ]: '#7e04db',
    [ EFFECT.ABOMINABLE_COMRADE ]: '#05ed18',
    [ EFFECT.IMMORTAL_RULERS ]: '#0412b3',
    [ EFFECT.IMMORTAL_KINGS ]: '#967b02',
    [ EFFECT.TWO_DAYS_THIRTY_YEARS ]: '#db620b',
    [ EFFECT.SATURDAY_MORNING_CARTOONS ]: '#2e9fe6',
    [ EFFECT.SWINESTER_SIX_MOST_WANTED ]: '#012107',
    [ EFFECT.FOURTH_WALL_CRAWLER ]: '#9107a3',
    [ EFFECT.FISK_DOWNFALL ]: '#fcef00',
    [ EFFECT.SECRET_OF_THE_HAND ]: '#fc0800',
    [ EFFECT.RULE_OF_LAW ]: '#ad0940',
    [ EFFECT.STRENGTH_OF_MARTYRS ]: '#05053b',
    [ EFFECT.ALL_ADAMANTIUM_AND_ATTITUDE ]: '#ff8c00',
    [ EFFECT.DEAL_WITH_IT ]: '#3cb371',
    [ EFFECT.EXECUTE_TARGET_ACQUISITION_SUBROUTINE ]: '#4b0082',
    [ EFFECT.PETITE ]: '#ffebcd',
    [ EFFECT.THE_LUCKY_ONE ]: '#adff2f',
    [ EFFECT.YOURE_TANGLING_WITH_THE_WRONG_XMEN ]: '#98fb98',
    [ EFFECT.BIG_BAD_DAD ]: '#1e90ff',
    [ EFFECT.BULL_TARGETS ]: '#2e8b57',
    [ EFFECT.CLONED_AT_BIRTH ]: '#66cdaa',
    [ EFFECT.MISS_ME ]: '#ffffe0',
    [ EFFECT.HOSTILE_TAKEOVER ]: '#20b2aa',
    [ EFFECT.WEDDING_CRASHER ]: '#008000',
    [ EFFECT.DINKY_SHRINKS ]: '#00008b',
    [ EFFECT.MALICE ]: '#cd5c5c',
    [ EFFECT.PURE_HATRED ]: '#6b8e23',
    [ EFFECT.THERE_GOES_THE_MULTIVERSE ]: '#8fbc8f',
    [ EFFECT.POWER_OF_MONEY ]: '#a52a2a',
    [ EFFECT.REVOLUTIONS_NEED_ARMS ]: '#7b68ee',
    [ EFFECT.AMBER_PRISON ]: '#808080',
    [ EFFECT.BANISHED ]: '#006400',
    [ EFFECT.ENERGY_ABSORPTION ]: '#5f9ea0',
    [ EFFECT.FUELED_WITH_RAGE ]: '#ffa500',
    [ EFFECT.RAGE_ON ]: '#daa520',
    [ EFFECT.BATTLE_OF_REALMS ]: '#0000cd',
    [ EFFECT.OATHSWORN ]: '#483d8b',
    [ EFFECT.ODINSONS_AND_ODINSDOTTIRS ]: '#ffff00',
    [ EFFECT.WARMONGER ]: '#40e0d0',
    [ EFFECT.HYDRA_RECRUITERS ]: '#48ccae',
    [ EFFECT.MERCENARY_COMPETITION ]: '#bb3ebb',
    [ EFFECT.CONTEMPTUOUS_HATRED ]: '#6d9d16',
    [ EFFECT.WE_AINT_NO_PUNCHLINE ]: '#8cef46',
    [ EFFECT.NEW_YORK_BRAWLERS ]: '#d1061c',
    [ EFFECT.NOT_SO_UNCANNY ]: '#f4f69c',
    [ EFFECT.IRON_MEN ]: '#9d3258',
    [ EFFECT.ASGARDIAN_REPUBLIC ]: '#e434bf',
    [ EFFECT.PATRIOT_GARRISON ]: '#6a988b',
    [ EFFECT.PET_PALS ]: '#a21a0a',
    [ EFFECT.HUNTRESSES ]: '#cf5064',
    [ EFFECT.PYRAMID_X ]: '#776e99',
    [ EFFECT.TEMPLE_OF_VISHANTI ]: '#aacff0',
    [ EFFECT.TRIBAL_WARFARE ]: '#f639df',
    [ EFFECT.EYES_OF_THE_DRAGON ]: '#7f7ece',
    [ EFFECT.MASTER_MARTIAL_ARTISTS ]: '#586f4f',
    [ EFFECT.SHADOWLAND ]: '#d2cdd4',
    [ EFFECT.THE_WAY_OF_THE_SPIDER ]: '#43c76e',
    [ EFFECT.A_BEING_DARKER_THAN_I ]: '#c7764d',
    [ EFFECT.FROM_LIGHT_TO_DARK ]: '#e81bcd',
    [ EFFECT.HEALING_TOUCH ]: '#c1ac4c',
    [ EFFECT.TIME_WE_CHANGED_TOO ]: '#f40fe2',
    [ EFFECT.BATTLEREALMS_CHANGING ]: '#b99d29',
    [ EFFECT.KINGS ]: '#2e703e',
    [ EFFECT.ROYALS ]: '#bbaa9e',
    [ EFFECT.WARRIORS ]: '#d04049',
    [ EFFECT.DIMENSIONAL_BUDDIES ]: '#f25a60',
    [ EFFECT.MANY_AS_ONE ]: '#f9b7c7',
    [ EFFECT.POOR_UNFORTUNATE_SOUL ]: '#8baf38',
    [ EFFECT.QUEENS_OF_SOULS ]: '#51c623',
    [ EFFECT.UNCHAINED ]: '#536fb7',
    [ EFFECT.WHAT_IF ]: '#4b6787',
    [ EFFECT.COSMIC_CONTROL ]: '#3a35aa',
    [ EFFECT.CUBE_WIELDERS ]: '#741b53',
    [ EFFECT.IDENTITY_DISORDER ]: '#636899',
    [ EFFECT.SHIELD_BUDDIES ]: '#928a23',
    [ EFFECT.SPACE_SURFERS ]: '#681940',
    [ EFFECT.FORTIFY_ENHANCEMENT ]: '#406372',
    [ EFFECT.SKIRMISH_ENHANCEMENT ]: '#5cf523',
    [ EFFECT.SUPPORT_ENHANCEMENT ]: '#b82c1f',
    [ EFFECT.MY_BEAUTIFUL_METEOR ]: '#d29060',
    [ EFFECT.MY_WORLD_OF_METAL ]: '#23f64f',
    [ EFFECT.DECIMATION_SW ]: '#8ddbe7',
    [ EFFECT.CHAOS_RISING ]: '#ebe6b8',
    [ EFFECT.TILL_INFINITY_DO_US_PART ]: '#bb88f1',
    [ EFFECT.DEMONIC_PACT ]: '#152a69',
    [ EFFECT.SUPER_STARS ]: '#f913fb',
    [ EFFECT.OUT_OF_THIS_WORLD ]: '#38c658',
    [ EFFECT.STAY_POSITIVE ]: '#21184f',
    [ EFFECT.KO_QUEENS ]: '#00bdeb',
    [ EFFECT.NEXT_ROUND_ON_ME ]: '#16a50a',
    [ EFFECT.MASTERFUL_COMBAT ]: '#ad9da8',
    [ EFFECT.ARM_WRESTLING_CLUB ]: '#97b49a',
    [ EFFECT.PAWN_SET_FREE ]: '#1677be',
    [ EFFECT.INCREDIBLE_SUBSTITUTE ]: '#17271c',
    [ EFFECT.I_REQUIRE_THY_SHIELD ]: '#624519',
};

function getTypeColor(typeId) {
    return TYPE_COLORS[ typeId ] || null;
}

function getEffectColor(effectId) {
    return EFFECT_COLORS[ effectId ] || null;
}

let lastSelected;
const rosters = {};
const legends = {};
const graphs = {};
const fdg = new ForceDirectedGraph({
    stiffness: 800,
    repulsion: 1600,
    damping: 0.5,
    nodeSelected: (nodes, edges) => {
        const currentSelected = {
            nodes,
            edges,
        };
        if(!deepEqual(lastSelected, currentSelected)) {
            const legend = legends[ fdg.id ];
            if (nodes && nodes.length > 1) {
                const amounts = {};
                const uniqueEdges = {};
                edges.forEach((edge) => {
                    const { id, amount } = edge.data;
                    if(uniqueEdges[ id ] && uniqueEdges[ id ].data.amount > amount) {
                        return;
                    }
                    uniqueEdges[ id ] = edge;
                });
                Object.values(uniqueEdges).forEach((edge) => {
                    const { effect, amount } = edge.data;
                    if(amounts[ effect ])
                        amounts[ effect ] += amount;
                    else
                        amounts[ effect ] = amount;
                });
                for (const effect of legend) {
                    effect.selected = Boolean(amounts[ effect.effectId ]);
                    effect.amount = amounts[ effect.effectId ];
                }
            }
            else if (nodes && nodes.length === 1) {
                const selected = {};
                edges.forEach((edge) => {
                    const { effect } = edge.data;
                    selected[ effect ] = true;
                });
                for (const effect of legend) {
                    effect.selected = selected[ effect.effectId ];
                    effect.amount = null;
                }
            }
            else {
                for (const effect of legend) {
                    effect.selected = true;
                    effect.amount = null;
                }
            }
            lastSelected = currentSelected;
            requestRedraw(5);
        }
        else if((!nodes || !nodes.length) && (!edges || !edges.length)) {
            const legend = legends[ fdg.id ];
            for(const effect of legend) {
                effect.selected = true;
                effect.amount = null;
            }
            requestRedraw(5);
        }
    },
    effectSelected: (effectId) => {
        const legend = legends[ fdg.id ];
        for(const effect of legend) {
            effect.selected = effectId === effect.effectId;
            effect.amount = null;
        }
        requestRedraw(5);
    },
});

function getGraph(id, championFilter, synergyFilter, useRoster) {
    const forceUpdate = useRoster && (!rosters[ id ] || rosters[ id ] !== roster.hash());
    if(!graphs[ id ] || forceUpdate) {
        const graph = new Graph(forceUpdate);
        const nodeMap = {};
        const legend = [];
        const championsFrom = {};
        const championsTo = {};
        const effectMap = {};
        const synergies = SYNERGIES
            .filter(synergyFilter)
            .map((synergy) => {
                championsFrom[ `${ synergy.attr.fromId }-${ synergy.attr.fromStars }` ] = true;
                championsTo[ synergy.attr.toId ] = true;
                return synergy;
            });
        (useRoster
            ? roster.all()
            : CHAMPIONS.filter((champion) => !UNRELEASED_CHAMPIONS[ champion.attr.uid ]))
                .filter((champion) => (championsTo[ champion.attr.uid ] || championsFrom[ `${ champion.attr.uid }-${ champion.attr.stars }` ]) && championFilter(champion))
                .forEach((champion) => {
                    const { typeId, uid, stars } = champion.attr;
                    const node = graph.newNode({
                        uid,
                        stars,
                        label: uid,
                        image: `images/champions/portrait_${ uid }.png`,
                        type: typeId,
                        color: TYPE_COLORS[ typeId ],
                        neighbors: {},
                        effects: {},
                        onOpen: () => {
                            router.setRoute(`/guide/${ uid }`);
                            requestRedraw();
                        },
                    });
                    nodeMap[ `${ uid }-${ stars }` ] = node;
                    if(!nodeMap[ uid ])
                        nodeMap[ uid ] = [];
                    nodeMap[ uid ].push(node);
                    return node;
                });
        synergies.forEach((synergy) => {
            const { fromId, fromStars, toId, effectId, effectAmount, group } = synergy.attr;
            const nodeFrom = nodeMap[ `${ fromId }-${ fromStars }` ];
            const nodesTo = nodeMap[ toId ];
            if(nodeFrom && nodesTo) {
                nodesTo.forEach((nodeTo) => {
                    nodeFrom.data.neighbors[ nodeTo.id ] = true;
                    nodeFrom.data.effects[ effectId ] = true;
                    nodeTo.data.neighbors[ nodeFrom.id ] = true;
                    nodeTo.data.effects[ effectId ] = true;
                    graph.newEdge(
                        nodeFrom,
                        nodeTo,
                        {
                            id: (group)?
                                `${ group }`:
                                `${ fromId }-${ fromStars }-${ toId }-${ effectId }`,
                            effect: effectId,
                            amount: effectAmount,
                            color: EFFECT_COLORS[ effectId ],
                        }
                    );
                    effectMap[ effectId ] = true;
                });
            }
        });
        for(const effectId in EFFECT_COLORS) {
            if(effectMap[ effectId ]) {
                legend.push({
                    effectId,
                    selected: true,
                });
            }
        }
        legends[ id ] = legend;
        graphs[ id ] = graph;
        rosters[ id ] = roster.hash();
        requestRedraw(5);
    }
    return graphs[ id ];
}

function getGraphId({ stars, effect, roster }) {
    let id = 'graph';
    if(stars) {
        id = `${ id }-stars-${ stars }`;
    }
    if (effect) {
        id = `${ id }-effect-${ effect }`;
    }
    if(roster) {
        id = `${ id }-roster`;
    }
    return id;
}

function getLegend(definition) {
    return legends[ getGraphId(definition) ];
}

function updateGraph(definition, ...dimensions) {
    const id = getGraphId(definition);
    let showStars = true;
    let championFilter = () => true;
    let synergyFilter = () => true;
    const { stars, effect, roster } = definition;
    if(stars) {
        showStars = false;
        championFilter = ({ attr }) => attr.stars === stars;
    }
    if (effect) {
        synergyFilter = ({ attr }) => attr.effectId === effect;
    }
    fdg.update(id, showStars, getGraph(id, championFilter, synergyFilter, roster), ...dimensions);
}

export default fdg;
export { getLegend, updateGraph, getTypeColor, getEffectColor };
