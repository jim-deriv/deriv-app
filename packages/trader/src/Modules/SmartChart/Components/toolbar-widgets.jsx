import PropTypes from 'prop-types';
import React from 'react';
import { isDesktop, isMobile } from '@deriv/shared';
import { ChartMode, DrawTools, Share, StudyLegend, Views, ToolbarWidget } from 'Modules/SmartChart';
import { observer } from '@deriv/stores';
import { useTraderStore } from 'Stores/useTraderStores';

const ToolbarWidgets = observer(({ position, updateChartType, updateGranularity }) => {
    const { is_accumulator } = useTraderStore();
    return (
        <ToolbarWidget position={position || isMobile() ? 'bottom' : null}>
            {!is_accumulator && (
                <ChartMode portalNodeId='modal_root' onChartType={updateChartType} onGranularity={updateGranularity} />
            )}
            {isDesktop() && <StudyLegend portalNodeId='modal_root' searchInputClassName='data-hj-whitelist' />}
            {isDesktop() && <Views portalNodeId='modal_root' searchInputClassName='data-hj-whitelist' />}
            {isDesktop() && <DrawTools portalNodeId='modal_root' />}
            {isDesktop() && <Share portalNodeId='modal_root' />}
        </ToolbarWidget>
    );
});

ToolbarWidgets.propTypes = {
    position: PropTypes.string,
    updateChartType: PropTypes.func,
    updateGranularity: PropTypes.func,
};

export default React.memo(ToolbarWidgets);
