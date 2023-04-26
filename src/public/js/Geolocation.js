export default class Geolocation {



    support() {
        if (!('geolocation' in navigator)) throw 'No soparta geolocalización'
    }

    getCurrentLocation({callback = null, errorCallback = null}) {

        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {

            if (!callback) return

            callback({ latitude, longitude })

        }, (e) => {
            if (!errorCallback) return
            errorCallback(e)

        }, { enableHighAccuracy: true, maximumAge: 0 })


    }

}