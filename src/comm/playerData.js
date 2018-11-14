/**
 * playerData: The class store player data, contain Username, Human, Money, and Power
 *
 * @class
 */
class playerData {
    /**
     * @constructor
     *
     * @param {string} Username - username
     * @param {number} Human - amount of human
     * @param {number} Money - amount of money
     * @param {number} Power - amount of Power
     */
    constructor (Username = 'none', Human = 0, Money = 0, Power = 0) {
        this.Username = Username
        this.Human = Human
        this.Money = Money
        this.Power = Power
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
    }
}

export default playerData

