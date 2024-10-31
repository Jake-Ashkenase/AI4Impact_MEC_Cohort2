"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const dom_1 = require("@cloudscape-design/test-utils-core/dom");
const button_1 = require("../button");
const popover_1 = require("../popover");
const styles_selectors_js_1 = require("../../../copy-to-clipboard/test-classes/styles.selectors.js");
class CopyToClipboardWrapper extends dom_1.ComponentWrapper {
    findCopyButton() {
        return this.findComponent(`.${button_1.default.rootSelector}`, button_1.default);
    }
    findStatusText(options = { popoverRenderWithPortal: false }) {
        return this.findComponent(`.${popover_1.default.rootSelector}`, popover_1.default).findContent({
            renderWithPortal: options.popoverRenderWithPortal,
        });
    }
    findTextToCopy() {
        return this.findByClassName(styles_selectors_js_1.default['text-to-copy']);
    }
}
exports.default = CopyToClipboardWrapper;
CopyToClipboardWrapper.rootSelector = styles_selectors_js_1.default.root;
//# sourceMappingURL=index.js.map