export default class NotifyScreenshotService {
    
     async getScreeShotHistory() {

       return await fetch('/screenshot-history').then(r => {
            if(!r.ok) throw r

            return r
        }).then(r => r.json())

    }

    async sendScreenShot(body) {

        return await fetch('/send-screenshot', {
            body : JSON.stringify(body),
            method : 'POST',
            headers : {
                "Content-type" : "application/json"
            }
        }).then(r => {
             if(!r.ok) throw r
 
             return r
         }).then(r => r.json())
 
     }

}