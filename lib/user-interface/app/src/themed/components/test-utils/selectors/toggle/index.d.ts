import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/selectors";
export default class ToggleWrapper extends ComponentWrapper {
    static rootSelector: string;
    private findAbstractSwitch;
    findLabel(): ElementWrapper;
    findNativeInput(): ElementWrapper;
    findDescription(): ElementWrapper;
}
