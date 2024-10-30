import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/selectors";
import ButtonWrapper from '../../button';
import ButtonDropdownWrapper from '../../button-dropdown';
import LinkWrapper from '../../link';
export default class TopNavigationWrapper extends ComponentWrapper {
    static rootSelector: string;
    findIdentityLink(): ElementWrapper;
    findLogo(): ElementWrapper;
    findTitle(): ElementWrapper;
    findSearch(): ElementWrapper;
    findUtilities(): import("@cloudscape-design/test-utils-core/selectors").MultiElementWrapper<TopNavigationUtilityWrapper>;
    findUtility(index: number): TopNavigationUtilityWrapper;
    findSearchButton(): ElementWrapper;
    findOverflowMenuButtonDropdown(): MenuDropdownWrapper;
}
export declare class MenuDropdownWrapper extends ButtonDropdownWrapper {
    findNativeButton(): ElementWrapper;
}
export declare class TopNavigationUtilityWrapper extends ComponentWrapper {
    findButtonLinkType(): LinkWrapper;
    findPrimaryButtonType(): ButtonWrapper;
    findMenuDropdownType(): TopNavigationMenuDropdownWrapper;
}
export declare class TopNavigationMenuDropdownWrapper extends ButtonDropdownWrapper {
    findNativeButton(): ElementWrapper;
    findTitle(): ElementWrapper;
    findDescription(): ElementWrapper;
}
