import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/selectors";
import ButtonDropdownWrapper from '../button-dropdown';
import SplitPanelWrapper from '../split-panel';
export default class AppLayoutWrapper extends ComponentWrapper {
    static rootSelector: string;
    findNavigation(): ElementWrapper;
    findOpenNavigationPanel(): ElementWrapper;
    findNavigationToggle(): ElementWrapper;
    findNavigationClose(): ElementWrapper;
    findContentRegion(): ElementWrapper;
    findNotifications(): ElementWrapper;
    findBreadcrumbs(): ElementWrapper;
    findTools(): ElementWrapper;
    findOpenToolsPanel(): ElementWrapper;
    findToolsClose(): ElementWrapper;
    findToolsToggle(): ElementWrapper;
    findSplitPanel(): SplitPanelWrapper;
    findSplitPanelOpenButton(): ElementWrapper;
    findActiveDrawer(): ElementWrapper;
    findActiveDrawerCloseButton(): ElementWrapper;
    findDrawersTriggers(): import("@cloudscape-design/test-utils-core/selectors").MultiElementWrapper<ElementWrapper>;
    /**
     * Finds a drawer trigger by the given id.
     *
     * @param id id of the trigger to find
     * @param options
     * * hasBadge (boolean) - If provided, only finds drawers with the badge or without badge respectively
     */
    findDrawerTriggerById(id: string, options?: {
        hasBadge?: boolean;
    }): ElementWrapper;
    findDrawersOverflowTrigger(): ButtonDropdownWrapper;
    findActiveDrawerResizeHandle(): ElementWrapper;
    findToolbar(): ElementWrapper;
    findDrawerTriggerTooltip(): ElementWrapper;
}
