/**
 * The function return 9-elements array contains map chunk data request
 *
 * @function
 *
 * @param {Object} viewPoint - contains X and Y key-value pair
 * @returns {Object} viewRange - A 9-elements array
 */
function calculateViewRange (viewPoint) {
    return new Promise((resolve, reject) => {
        let viewRange = []
        for (let i = 0; i < 9; i++) {
            viewRange.push({'X': viewPoint.X + (i%3 - 1), 'Y': viewPoint.Y + Math.floor((i/3) - 1)})
        }
        resolve(viewRange)
    })
}

export default calculateViewRange

