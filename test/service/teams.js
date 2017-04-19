import { championMap } from '../../src/data/champions';
import buildArena from '../../src/service/teams/build-arena';
import buildQuest from '../../src/service/teams/build-quest';
import { PRESETS, PRESETS_DUPLICATES, PRESETS_RANGE } from '../../src/service/teams';

describe('service/teams', () => {

    describe('build-arena', () => it('builds expected team', () => {
        const result = buildArena({
            champions: [
                'drax-2',
                'ultron-2',
                'wolverine-2',
                'antman-2',
                'yellowjacket-2',
            ].map((id) => championMap[ id ].attr),
            size: 3,
            weights: {
                ...PRESETS[ 'offensive' ],
                ...PRESETS_DUPLICATES[ 'balanced' ],
            },
            range: {
                ...PRESETS_RANGE[ 'all' ],
            },
            progress: () => {},
        });
        if(result.teams && result.teams.length)
            result.teams[ 0 ].sort();

        expect(JSON.stringify(result.teams[ 0 ])).to.equal('["antman-2","ultron-2","yellowjacket-2"]');
    }));

    describe('build-quest', () => it('builds expected team', () => {
        const result = buildQuest({
            champions: [
                'drax-2',
                'ultron-2',
                'wolverine-2',
                'antman-2',
                'yellowjacket-2',
            ].map((id) => championMap[ id ].attr),
            size: 3,
            weights: {
                ...PRESETS[ 'offensive' ],
                ...PRESETS_DUPLICATES[ 'balanced' ],
            },
            range: {
                ...PRESETS_RANGE[ 'all' ],
            },
            progress: () => {},
        });
        if(result.teams && result.teams.length)
            result.teams[ 0 ].sort();

        expect(JSON.stringify(result.teams[ 0 ])).to.equal('["antman-2","ultron-2","yellowjacket-2"]');
    }));
});
