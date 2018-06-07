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
    [ EFFECT.STUN_ACTIVATION ]: '#f66',
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
    [ EFFECT.CUBICLE_MATES ]: '#b0a',
    [ EFFECT.OTHER_HALF ]: '#a1a',
    [ EFFECT.THUNDER ]: '#a0b',
    [ EFFECT.PROFESSORS_IN_CRIME ]: '#c0a',
    [ EFFECT.MOSTLY_AVERAGE_JOES ]: '#a2a',
    [ EFFECT.TERMINATION_CONTRACT ]: '#a0c',
    [ EFFECT.TEAM_DEADPOOL_AWESOME_FORCE ]: '#f01',
    [ EFFECT.ANNOYANCES_ASSEMBLE ]: '#0f0',
    [ EFFECT.BROKEN_MINDS ]: '#0fa',
    [ EFFECT.THE_GOLD_STANDARD ]: '#ed0',
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
