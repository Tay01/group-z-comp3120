
const StateWrapper = () => {
    const states = {}
    function setState(stateName, stateValue){
        states[stateName] = stateValue;
    }
    function getState(stateName){
        return states[stateName];
    }
}

export default StateWrapper;