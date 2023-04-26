export default class CustomDate extends Date {
    minute
    hour

    constructor() {
        super()
        this.hour = this.getHours()
        this.minute = this.getMinutes()
    }

    isTomorrow() {
        return (this.hour >= 0 && this.minute <= 59) && (this.hour <= 11 && this.minute <= 59)
    }


    isAfternoon() {
        return (this.hour >= 12 && this.minute <= 59) && (this.hour <= 17 && this.minute <= 59)
    }

    isNight() {
        return (this.hour >= 18 && this.minute <= 59) && (this.hour <= 23 && this.minute <= 59)
    }

}