import { ComponentWrapper, ElementWrapper } from '@cloudscape-design/test-utils-core/dom';
export default class FileDropzoneWrapper extends ComponentWrapper {
    static rootSelector: string;
    findContent(): ElementWrapper;
}