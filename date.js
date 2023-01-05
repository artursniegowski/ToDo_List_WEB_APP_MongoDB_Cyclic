// exporting this function so we can use it as a module
// after importing it in the main file
// module.exports = getDate 
// then we call in the main file just date() - or a better solution
// to be more specific
// or if we want to specify more functions (module.exports = exports)
exports.getDate = () => {
    // getting the day in specific form 
    const today = new Date();
    const options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
    };
    return today.toLocaleDateString("en-US", options);
};



// exporting the next function
exports.getDay = () => {
    // getting the day in specific form 
    const today = new Date();
    const options = { 
        weekday: 'long', 
    };
    return today.toLocaleDateString("en-US", options);
};