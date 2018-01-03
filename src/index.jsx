import 'font-awesome-webpack';
import './index.css';
import { notify } from './util/notification';
import { EFFECT_VALUES } from './data/model/Effect';
import { GUIDE_KEYS, SPOTLIGHT } from './data/guides';
import lang from './service/lang';
import app from './service/app';
import router from './service/router';
import roster from './service/roster';
import { buildTeam } from './service/teams';
import analytics from './service/analytics';
import App from './view/App.jsx';
import Slides from './view/Slides.jsx';
import GlossaryPage from './view/App/GlossaryPage.jsx';
import GlossaryMenu from './view/App/GlossaryMenu.jsx';
import GuidePage from './view/App/GuidePage.jsx';
import GuideMenu from './view/App/GuideMenu.jsx';
import GuideEditPage from './view/App/GuideEditPage.jsx';
import GuideEditMenu from './view/App/GuideEditMenu.jsx';
import LanguageEditPage from './view/App/LanguageEditPage.jsx';
import LanguageEditMenu from './view/App/LanguageEditMenu.jsx';
import RosterPage from './view/App/RosterPage.jsx';
import RosterMenu from './view/App/RosterMenu.jsx';
import RosterAddPage from './view/App/RosterAddPage.jsx';
import RosterAddMenu from './view/App/RosterAddMenu.jsx';
import RosterEditPage from './view/App/RosterEditPage.jsx';
import RosterEditMenu from './view/App/RosterEditMenu.jsx';
import TeamsPage from './view/App/TeamsPage.jsx';
import TeamsMenu from './view/App/TeamsMenu.jsx';
import TeamsEditPage from './view/App/TeamsEditPage.jsx';
import TeamsSettingsPage from './view/App/TeamsSettingsPage.jsx';
import TeamsSettingsMenu from './view/App/TeamsSettingsMenu.jsx';
import SynergyPage from './view/App/SynergyPage.jsx';
import SynergyMenu from './view/App/SynergyMenu.jsx';
import { requestRedraw } from './util/animation';
import m from 'mithril';

app.tabs = [
    {
        id: 'guide',
        title: 'guide',
        icon: 'user',
    },
    {
        id: 'roster',
        title: 'roster',
        icon: 'users',
    },
    {
        id: 'teams',
        title: 'teams',
        icon: 'cogs',
    },
    {
        id: 'synergy',
        title: 'synergy',
        icon: 'synergy',
    },
    {
        id: 'glossary',
        title: 'glossary',
        icon: 'info-circle',
    },
    {
        id: 'language',
        title: 'language',
        icon: 'globe',
        hidden: true,
    },
];

/**
 * Reset router if we are hot loading so we only get new routes.
 */
if(router._invoked) {
    router.destroy();
    router.routes = {};
}

router.on('/guide/?', () => {
    let route = app.history.guide;
    if(!route) {
        route = `/guide/${ SPOTLIGHT }`;
    }
    else if(route === app.route) {
        route = `/guide/${ GUIDE_KEYS[ (Math.random() * GUIDE_KEYS.length) | 0 ] }`;
    }
    router.setRoute(route);
});

router.on('/guide/:uid/?', (uid) => {
    app.tab = 'guide';
    app.slides[ 'guide-show' ] = (
        <GuidePage uid={ uid } />
    );
    app.pages[ 'guide' ] = (
        <Slides
            slides={[
                app.slides[ 'guide-show' ],
                app.slides[ 'guide-edit' ],
            ]}
            current={ 0 }
        />
    );
    app.menu = (
        <GuideMenu uid={ uid } />
    );
    app.button = !app.edit? null: {
        icon: 'pencil',
        href: `/guide/${ uid }/edit`,
    };
    app.route = app.history.guide = `/guide/${ uid }`;
    app.hotkeys = null;
    analytics.pageView();
    requestRedraw();
});

router.on('/guide/:uid/edit/?', (uid) => {
    app.edit = true;
    app.tab = 'guide';
    app.slides[ 'guide-edit' ] = (
        <GuideEditPage uid={ uid } />
    );
    app.pages[ 'guide' ] = (
        <Slides
            slides={[
                app.slides[ 'guide-show' ],
                app.slides[ 'guide-edit' ],
            ]}
            current={ 1 }
        />
    );
    app.menu = (
        <GuideEditMenu uid={ uid } />
    );
    app.button = {
        icon: 'reply',
        href: `/guide/${ uid }`,
    };
    app.route = `/guide/${ uid }/edit`;
    app.hotkeys = null;
    analytics.pageView();
    requestRedraw();
});

router.on('/roster/?', () => {
    app.tab = 'roster';
    app.slides[ 'roster-show' ] = (
        <RosterPage />
    );
    app.pages[ 'roster' ] = (
        <Slides
            slides={[
                app.slides[ 'roster-add' ],
                app.slides[ 'roster-show' ],
                app.slides[ 'roster-edit' ],
            ]}
            current={ 1 }
        />
    );
    app.menu = (
        <RosterMenu />
    );
    app.button = {
        icon: 'user-plus',
        href: `/roster/add/${ app.lastAddStars || 2 }`,
    };
    app.route = '/roster';
    app.hotkeys = null;
    analytics.pageView();
    requestRedraw();
    if(roster.all().length === 0) {
        notify({
            message: lang.string('notification-roster-empty'),
            tag: 'roster-empty',
            onclick: () => router.setRoute(`/roster/add/${ app.lastAddStars || 2 }`),
        });
    }
});

router.on('/roster/add/:stars/?', (stars) => {
    app.tab = 'roster';
    app.slides[ 'roster-add' ] = (
        <RosterAddPage stars={ Number.parseInt(stars, 10) } />
    );
    app.pages[ 'roster' ] = (
        <Slides
            slides={[
                app.slides[ 'roster-add' ],
                app.slides[ 'roster-show' ],
                app.slides[ 'roster-edit' ],
            ]}
            current={ 0 }
        />
    );
    app.menu = (
        <RosterAddMenu />
    );
    app.button = {
        icon: 'share',
        href: '/roster',
    };
    app.lastAddStars = stars;
    app.route = `/roster/add/${ stars }`;
    app.hotkeys = null;
    analytics.pageView();
    requestRedraw();
});

router.on('/roster/:uid/:stars/?', (uid, stars) => {
    app.tab = 'roster';
    app.slides[ 'roster-edit' ] = (
        <RosterEditPage uid={ uid } stars={ Number.parseInt(stars, 10) } />
    );
    app.pages[ 'roster' ] = (
        <Slides
            slides={[
                app.slides[ 'roster-add' ],
                app.slides[ 'roster-show' ],
                app.slides[ 'roster-edit' ],
            ]}
            current={ 2 }
        />
    );
    app.menu = (
        <RosterEditMenu uid={ uid } stars={ Number.parseInt(stars, 10) } />
    );
    app.button = {
        icon: 'reply',
        href: '/roster',
    };
    app.route = `/roster/${ uid }/${ stars }`;
    app.hotkeys = null;
    analytics.pageView();
    requestRedraw();
});

router.on('/teams/settings/?', () => {
    app.tab = 'teams';
    app.slides[ 'teams-settings' ] = (
        <TeamsSettingsPage />
    );
    app.pages[ 'teams' ] = (
        <Slides
            slides={[
                app.slides[ 'teams-settings' ],
                app.slides[ 'teams-main' ],
                app.slides[ 'teams-edit' ],
            ]}
            current={ 0 }
        />
    );
    app.menu = (
        <TeamsSettingsMenu />
    );
    app.button = {
        icon: 'share',
        href: '/teams',
    };
    app.route = '/teams/settings';
    app.hotkeys = [
        {
            'which': 'B',
            'modifiers': [ 'ctrl' ],
            'callback': buildTeam,
        },
    ];
    analytics.pageView();
    requestRedraw();
});

router.on('/teams/edit/?', () => {
    app.tab = 'teams';
    app.slides[ 'teams-edit' ] = (
        <TeamsEditPage />
    );
    app.pages[ 'teams' ] = (
        <Slides
            slides={[
                app.slides[ 'teams-settings' ],
                app.slides[ 'teams-main' ],
                app.slides[ 'teams-edit' ],
            ]}
            current={ 2 }
        />
    );
    app.hotkeys = [
        {
            'which': 'B',
            'modifiers': [ 'ctrl' ],
            'callback': buildTeam,
        },
    ];
    app.menu = (
        <TeamsMenu edit />
    );
    app.button = {
        icon: 'reply',
        href: '/teams',
    };
    app.route = '/teams/edit';
    analytics.pageView();
    requestRedraw();
});

router.on('/teams/?', () => {
    app.tab = 'teams';
    app.slides[ 'teams-main' ] = (
        <TeamsPage />
    );
    app.pages[ 'teams' ] = (
        <Slides
            slides={[
                app.slides[ 'teams-settings' ],
                app.slides[ 'teams-main' ],
                app.slides[ 'teams-edit' ],
            ]}
            current={ 1 }
        />
    );
    app.menu = (
        <TeamsMenu />
    );
    app.button = {
        icon: 'sliders',
        href: '/teams/settings',
    };
    app.route = '/teams';
    app.hotkeys = [
        {
            'which': 'B',
            'modifiers': [ 'ctrl' ],
            'callback': buildTeam,
        },
    ];
    analytics.pageView();
    requestRedraw();
});

router.on('/synergy/?', () => router.setRoute(app.history.synergy || `/synergy/stars/${ 2 }`));

router.on('/synergy/([1-5])/?', (stars) => router.setRoute(`/synergy/stars/${ Number.parseInt(stars, 10) }`));

router.on('/synergy/effect/:effect/?', (effect) => {
    if(EFFECT_VALUES.indexOf(effect) === -1) {
        router.setRoute('/synergy');
        return;
    }

    app.tab = 'synergy';
    app.pages[ 'synergy' ] = (
        <SynergyPage effect={ effect } />
    );
    app.menu = (
        <SynergyMenu effect={ effect } />
    );
    app.button = null;
    app.route = app.history.synergy = `/synergy/effect/${ effect }`;
    app.hotkeys = null;
    analytics.pageView();
    requestRedraw();
});

router.on('/synergy/stars/:stars/?', (stars) => {
    app.tab = 'synergy';
    app.pages[ 'synergy' ] = (
        <SynergyPage stars={ Number.parseInt(stars, 10) } />
    );
    app.menu = (
        <SynergyMenu stars={ stars } />
    );
    app.button = null;
    app.route = app.history.synergy = `/synergy/stars/${ stars }`;
    app.hotkeys = null;
    analytics.pageView();
    requestRedraw();
});

router.on('/synergy/all/?', () => {
    app.tab = 'synergy';
    app.pages[ 'synergy' ] = (
        <SynergyPage />
    );
    app.menu = (
        <SynergyMenu />
    );
    app.button = null;
    app.route = app.history.synergy = '/synergy/all';
    app.hotkeys = null;
    analytics.pageView();
    requestRedraw();
});

router.on('/glossary/?', () => {
    app.tab = 'glossary';
    app.pages[ 'glossary' ] = (
        <GlossaryPage />
    );
    app.menu = (
        <GlossaryMenu />
    );
    app.button = null;
    app.route = '/glossary';
    app.hotkeys = null;
    analytics.pageView();
    requestRedraw();
});

router.on('/lang/:lang/?([#].+)?', (langId, route) => {
    lang.change(langId);
    if(route) {
        router.setRoute(`${ route.substr(1) }`);
    }
    else {
        router.setRoute(`${ app.route }`);
    }

});

router.on('/lang/:lang/edit/?', (langId) => {
    app.tab = 'language';
    app.pages[ 'language' ] = (
        <LanguageEditPage langId={ langId } />
    );
    app.menu = (
        <LanguageEditMenu langId={ langId } />
    );
    app.button = null;
    app.route = `/lang/${ langId }/edit`;
    app.hotkeys = null;
    analytics.pageView();
    requestRedraw();
});

router.on('.*', () => router.setRoute('roster'));

m.mount(document.body, (
    <App />
));

app.route = (roster.all().length === 0) ? '/guide' : '/roster';
router.init(app.route);

const handleKeyPress = (event) => {
    if(app.hotkeys) {
        const which = String.fromCharCode(event.which);
        const modifiers = {
            'ctrl': event.ctrlKey || event.metaKey,
            'alt': event.altKey,
            'shift': event.shiftKey,
        };
        app.hotkeys
            .filter((hotkey) => which === hotkey.which && (
                !hotkey.modifiers ||
                hotkey.modifiers.every((modifier) => modifiers[ modifier ])
            ))
            .forEach((hotkey) => hotkey.callback());
    }
};
window.addEventListener('keydown', handleKeyPress);
if(window[ '__champions_key_handler__' ]) {
    window.removeEventListener('keydown', window[ '__champions_key_handler__' ]);
}
window[ '__champions_key_handler__' ] = handleKeyPress;
