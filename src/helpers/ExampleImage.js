/**
 * Copyright Schrodinger, LLC
 */
const React = require('react');

const PropTypes = require('prop-types');

const createReactClass = require('create-react-class');

const PendingPool = {};
const ReadyPool = {};
let imageIdCounter = 0;

const ExampleImage = createReactClass({
    displayName: 'ExampleImage',

    propTypes: {
        src: PropTypes.string.isRequired,
    },

    getInitialState() {
        return {
            ready: false,
        };
    },

    componentWillMount() {
        this.componentId = imageIdCounter++;
        this._load(this.props.src);
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.setState({src: null});
            this._load(nextProps.src);
        }
    },

    componentWillUnmount() {
        const loadingPool = PendingPool[this.props.src];
        if (loadingPool) {
            delete loadingPool[this.componentId];
        }
    },

    render() {
        const style = this.state.src ?
            {backgroundImage: 'url(' + this.state.src + ')'} :
            undefined;

        return <div className="exampleImage" style={style}/>;
    },

    _load(/*string*/ src) {
        if (ReadyPool[src]) {
            this.setState({src: src});
            return;
        }

        if (PendingPool[src]) {
            PendingPool[src][this.componentId] = this._onLoad;
            return;
        }

        const callbackPool = {};
        PendingPool[src] = callbackPool;
        callbackPool[this.componentId] = this._onLoad;

        const img = new Image();
        img.onload = () => {
            Object.keys(callbackPool).forEach(componentId => {
                callbackPool[componentId](src);
            });
            delete PendingPool[src];
            img.onload = null;
            src = undefined;
        };
        img.src = src;
    },

    _onLoad(/*string*/ src) {
        ReadyPool[src] = true;
        if (src === this.props.src) {
            this.setState({
                src: src,
            });
        }
    },
});


module.exports = ExampleImage;
