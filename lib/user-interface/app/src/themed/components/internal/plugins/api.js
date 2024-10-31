import { ActionButtonsController } from './controllers/action-buttons';
import { AlertFlashContentController, } from './controllers/alert-flash-content';
import { AppLayoutWidgetController } from './controllers/app-layout-widget';
import { BreadcrumbsController } from './controllers/breadcrumbs';
import { DrawersController } from './controllers/drawers';
import { SharedReactContexts } from './controllers/shared-react-contexts';
const storageKey = Symbol.for('awsui-plugin-api');
function findUpApi(currentWindow) {
    try {
        if (currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow[storageKey]) {
            return currentWindow[storageKey];
        }
        if (!currentWindow || currentWindow.parent === currentWindow) {
            // When the window has no more parents, it references itself
            return undefined;
        }
        return findUpApi(currentWindow.parent);
    }
    catch (ex) {
        // Most likely a cross-origin access error
        return undefined;
    }
}
export function loadApi() {
    if (typeof window === 'undefined') {
        return installApi({});
    }
    const win = window;
    const existingApi = findUpApi(win);
    win[storageKey] = installApi(existingApi !== null && existingApi !== void 0 ? existingApi : {});
    return win[storageKey];
}
export const { awsuiPlugins, awsuiPluginsInternal } = loadApi();
function installApi(api) {
    var _a, _b;
    (_a = api.awsuiPlugins) !== null && _a !== void 0 ? _a : (api.awsuiPlugins = {});
    (_b = api.awsuiPluginsInternal) !== null && _b !== void 0 ? _b : (api.awsuiPluginsInternal = {});
    const appLayoutDrawers = new DrawersController();
    api.awsuiPlugins.appLayout = appLayoutDrawers.installPublic(api.awsuiPlugins.appLayout);
    api.awsuiPluginsInternal.appLayout = appLayoutDrawers.installInternal(api.awsuiPluginsInternal.appLayout);
    const appLayoutController = new AppLayoutWidgetController();
    api.awsuiPluginsInternal.appLayoutWidget = appLayoutController.installInternal(api.awsuiPluginsInternal.appLayoutWidget);
    const alertActions = new ActionButtonsController();
    api.awsuiPlugins.alert = alertActions.installPublic(api.awsuiPlugins.alert);
    api.awsuiPluginsInternal.alert = alertActions.installInternal(api.awsuiPluginsInternal.alert);
    const alertContent = new AlertFlashContentController();
    api.awsuiPlugins.alertContent = alertContent.installPublic(api.awsuiPlugins.alertContent);
    api.awsuiPluginsInternal.alertContent = alertContent.installInternal(api.awsuiPluginsInternal.alertContent);
    const flashContent = new AlertFlashContentController();
    api.awsuiPlugins.flashContent = flashContent.installPublic(api.awsuiPlugins.flashContent);
    api.awsuiPluginsInternal.flashContent = flashContent.installInternal(api.awsuiPluginsInternal.flashContent);
    const flashbarActions = new ActionButtonsController();
    api.awsuiPlugins.flashbar = flashbarActions.installPublic(api.awsuiPlugins.flashbar);
    api.awsuiPluginsInternal.flashbar = flashbarActions.installInternal(api.awsuiPluginsInternal.flashbar);
    const breadcrumbs = new BreadcrumbsController();
    api.awsuiPluginsInternal.breadcrumbs = breadcrumbs.installInternal(api.awsuiPluginsInternal.breadcrumbs);
    const sharedReactContexts = new SharedReactContexts();
    api.awsuiPluginsInternal.sharedReactContexts = sharedReactContexts.installInternal(api.awsuiPluginsInternal.sharedReactContexts);
    return api;
}
//# sourceMappingURL=api.js.map