"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartPopoverSeriesWrapper = exports.ChartPopoverSeriesItemWrapper = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const dom_1 = require("@cloudscape-design/test-utils-core/dom");
const button_1 = require("../button");
const styles_selectors_js_1 = require("../../../expandable-section/styles.selectors.js");
const styles_selectors_js_2 = require("../../../internal/components/chart-popover/styles.selectors.js");
const styles_selectors_js_3 = require("../../../internal/components/chart-series-details/styles.selectors.js");
const styles_selectors_js_4 = require("../../../popover/styles.selectors.js");
class ChartPopoverSeriesItemWrapper extends dom_1.ElementWrapper {
    findKey() {
        // If a series has sub-items and is expandable, the key will be inside the header of an expandable section.
        return (this.findByClassName(styles_selectors_js_1.default['header-text']) ||
            this.findByClassName(styles_selectors_js_3.default.key));
    }
    findValue() {
        return this.findByClassName(styles_selectors_js_3.default.value);
    }
}
exports.ChartPopoverSeriesItemWrapper = ChartPopoverSeriesItemWrapper;
class ChartPopoverSeriesWrapper extends ChartPopoverSeriesItemWrapper {
    findSubItems() {
        return this.findAll(`.${styles_selectors_js_3.default['inner-list-item']}`).map(wrapper => new ChartPopoverSeriesItemWrapper(wrapper.getElement()));
    }
}
exports.ChartPopoverSeriesWrapper = ChartPopoverSeriesWrapper;
class ChartPopoverWrapper extends dom_1.ComponentWrapper {
    findHeader() {
        return this.findByClassName(styles_selectors_js_4.default.header);
    }
    findContent() {
        return this.findByClassName(styles_selectors_js_4.default.content);
    }
    findDismissButton() {
        return this.findComponent(`.${styles_selectors_js_4.default['dismiss-control']}`, button_1.default);
    }
    findSeries() {
        return this.findAll(`.${styles_selectors_js_3.default['list-item']}`).map(wrapper => new ChartPopoverSeriesWrapper(wrapper.getElement()));
    }
}
exports.default = ChartPopoverWrapper;
ChartPopoverWrapper.rootSelector = styles_selectors_js_2.default.root;
//# sourceMappingURL=chart-popover.js.map