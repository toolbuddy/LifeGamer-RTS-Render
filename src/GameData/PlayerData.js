/**
 * PlayerData: The class store player data, contain Username, Human, Money, and Power
 *
 * @class
 */
class PlayerData {
    /**
     * @constructor
     *
     */
    constructor () {
        this.Username = 'none'                  // using for status and sending request
        this.Human = 0                          // using for status
        this.Money = 0                          // using for status
        this.Power = 0                          // using for status
        this.Initialized = false                // using for checking player first play or not
        this.Home = null                        // using for menu -> Home button
    }
    /**
     * username setting
     *
     * @function
     *
     * @param {string} Username - username
     */
    setUsername (Username) {
        this.Username = Username
    }
    /**
     * updating userdata
     *
     * @function
     *
     * @param {Object} data - the data getting from backend server
     */
    updateUserData (data) {
        this.Human = data.Human
        this.Money = data.Money
        this.Power = data.Power
        this.Initialized = data.Initialized
        this.Home = data.Home
    }
    /**
     * getting userdata
     *
     * @function
     *
     * @returns {Object} playerdata - contains Username, Human,Money, and Power
     */
    getUserData () {
        return {
            Username: this.Username,
            Human: this.Human,
            Money: this.Money,
            Power: this.Power,
            Home: this.Home
        }
    }
}

export default PlayerData

