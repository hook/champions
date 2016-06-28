import './SynergyPage.scss';
import classNames from 'classnames';
import { effectImage } from '../../data/effects';
import graph, { getLegend, updateGraph, getEffectColor } from '../../service/graph';
import lang from '../../service/lang';
import synergy from '../../service/synergy';
import Icon from '../Icon.jsx';
import ImageIcon from '../ImageIcon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function config(definition, element, isInitialized) {
    const { top, left, width, height } = element.getBoundingClientRect();
    if(!isInitialized) {
        element.appendChild(graph.canvas);
    }
    updateGraph(definition, top, left, width, height);
}

const SynergyPage = {
    view(ctrl, { stars, effect }) {
        const { roster } = synergy;
        const legend = getLegend({ stars, effect, roster });
        return (
            <div m="SynergyPage" class="synergy" config={ config.bind(null, { stars, effect, roster }) }>
                <div class={ classNames('legend', { 'legend--hidden': !synergy.legend }) }>
                    { legend && legend.map(({ effectId, selected, amount }) => (
                        <div
                            class={ classNames('no-select',
                                'legend-effect',
                                `legend-effect--${ effectId }`,
                                { 'legend-effect--selected': selected }
                            ) }
                            style={ `border-color: ${ getEffectColor(effectId) }` }
                            onclick={ () => {
                                graph.selectEdgeType(effectId);
                                requestRedraw(5);
                            }}
                            title={ lang.get(`effect-${ effectId }-description`) }
                        >
                            <ImageIcon
                                src={ effectImage(effectId, 'white') }
                                alt={ effectImage(effectId, 'black') }
                                icon="square"
                                before
                            />
                            <span class="legend-effect-title">
                                { lang.get(`effect-${ effectId }-shortname`, null) || lang.get(`effect-${ effectId }-name`) }
                                { amount && ` - ${ amount }%` }
                            </span>
                        </div>
                    )) || null }
                    { legend && legend.length === 0 && (
                        <div
                            class={ classNames('no-select', 'legend-effect', 'legend-effect--none') }
                            title={ lang.get('effects-none') }
                        >
                            <Icon icon="times-circle" before/>
                            <span class="legend-effect-title">
                                <i>{ lang.get('effects-none') }</i>
                            </span>
                        </div>
                    ) || null }
                </div>
            </div>
        );
    },
};

export default SynergyPage;
