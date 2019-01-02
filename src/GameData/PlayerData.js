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
        this.data = null
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
        this.data = data
    }
    /**
     * getting userdata to status
     *
     * @function
     *
     * @returns {Object} playerdata - contains Population, PopulationCap, Money, Power and PowerMax
     */
    getUserStatusData () {
        return {
            Population: this.data.Population,
            PopulationCap: this.data.PopulationCap,
            Money: this.data.Money,
            Power: this.data.Power,
            PowerMax: this.data.PowerMax
        }
    }
    /**
     * The function getting user home point
     *
     * @function
     *
     * @returns {Object} homepoint - contains X and Y key-value
     */
    getHomePoint () {
        return this.data.Home
    }
}

export default PlayerData

