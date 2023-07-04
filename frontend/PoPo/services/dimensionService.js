import { Dimensions } from 'react-native';

export default class DimensionService {
    static callbackFuncs = [];


    static getWidthHeight = () => {
        const { height, width } = Dimensions.get('screen');
        return { height, width };
    }

    static getMinDimension = () => {
        const { height, width } = Dimensions.get('screen');
        const min = Math.min(height, width);
        return min;
    }

    static getMaxDimension = () => {
        const { height, width } = Dimensions.get('screen');
        const max = Math.max(height, width);
        return max;
    }

    static getOrientation = () => {
        const { height, width } = Dimensions.get('screen');
        if (height > width) {
            return "vertical"
        } else {
            return "horizontal"
        }
    }

    static initEventListener() {
        Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (DimensionService.callbackFuncs.length > 0) {
                DimensionService.callbackFuncs.map((func) => { func(); })
            }
        })
    }

    static addListener(callbackFunc) {
        DimensionService.callbackFuncs.push(callbackFunc);
    }
}