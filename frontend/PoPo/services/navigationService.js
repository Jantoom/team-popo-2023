/**
 * Service that provides navigation between screens.
 */
export default class NavigationService {
    static _screens = new Map();
    static _current;
    static _onChange;

    /**
     * Registers the callback triggered when the screen changes.
     * @param { Function } callback Callback function
     */
    static registerListener(callback) {
        NavigationService._onChange = callback;
    }

    /**
     * Returns the current screen element to render.
     * @returns React element
     */
    static getComponent() {
        if (NavigationService._screens.size === 0) {
            throw "No registered screens.";
        }

        return NavigationService._screens
            .get(NavigationService._current);
    }

    /**
     * Registers a screen. If the current screen is not set, this will
     * also set the current screen to the newly registered screen.
     * @param { string } name Name to reference the screen by.
     * @param { ReactElement } screen React element to render.
     */
    static register(name, screen) {
        NavigationService._screens
            .set(name, screen);

        if (NavigationService._current === undefined) {
            NavigationService._current = name;
        }
    }

    /**
     * Navigates to the given screen.
     * @param { string } name Name of screen.
     */
    static navigate(name) {
        if (!NavigationService._screens.has(name)) {
            throw "Screen not registered.";
        }

        if (NavigationService._current === name) return;

        NavigationService._current = name;
        if (NavigationService._onChange === undefined) return;

        NavigationService._onChange(name);
    }
}