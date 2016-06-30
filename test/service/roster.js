import roster from '../../src/service/roster';

describe('service/roster', () => {

    describe('.toCSV', () => it('should return the expected CSV', () => {
        roster.clear();
        roster.add('blackbolt', 2);
        roster.add('drax', 2);
        roster.set('drax', 2, {
            rank: 3,
            level: 30,
            awakened: 16,
            pi: 500,
        });

        const csv = roster.toCSV('\n');
        expect(csv).to.equal('Id,Stars,Rank,Level,Awakened,Pi,Role\n"blackbolt",2,1,1,0,0,\n"drax",2,3,30,16,500,');
    }));

    describe('.fromCSV', () => it('should build an expected roster from given CSV', () => {
        const csv = 'Id,Stars,Rank,Level,Awakened,Pi,Role\n"blackbolt",2,1,1,0,0,\n"drax",2,3,30,16,500,';
        roster.clear();
        roster.fromCSV(csv);

        const json = JSON.parse(JSON.stringify(roster.all()));
        expect(json).to.deep.equal([
            { 'uid':'blackbolt', 'stars':2, 'typeId':'cosmic', 'pi':0, 'rank':1, 'level':1, 'awakened':0, role: null },
            { 'uid':'drax', 'stars':2, 'typeId':'cosmic', 'pi':500, 'rank':3, 'level':30, 'awakened':16, role: null },
        ]);
    }));

});
