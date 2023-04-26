export default class Screenshot {

   track
   mediaStream
   videoElemet
   displaySurface
   onendedCallback

   constructor(videoElemet) {

      this.track = null
      this.mediaStream = null
      this.videoElemet = videoElemet
      this.displaySurface = 'monitor'
      this.onendedCallback = null

   }

   setOnendedCallback(callback) {
      this.onendedCallback = callback
   }

   /**
    * Pedir permisos para presentar pantalla
    */

   async screenPermissions() {

      if (this.isProjectingScreen()) throw 'Actualmente proyectando pantalla'

      try {

         this.mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: 'browser' },
            displaySurface: this.displaySurface
         })

         this.track = this.mediaStream.getVideoTracks()[0]

         if(this.onendedCallback) this.track.onended = this.onendedCallback

         if (this.track.getSettings().displaySurface != this.displaySurface) throw 'Se requiere que comparta toda sus pantallas.'

         this.videoElemet.srcObject = this.mediaStream;


      } catch (error) {
         if (this.track) this.stop()
         throw error
      }
   }

   isProjectingScreen() {
      return this.track?.readyState === 'live'
   }

   stop() {
      this.track?.stop()
   }

   /**
    * 
    * Tomar patallazo
    */
   async take() {

      if (!this.isProjectingScreen()) throw 'No proyectas tu pantalla'

      let imageCapture = new ImageCapture(this.track)
      let bitmap = await imageCapture.grabFrame()

      const canvasCustom = document.createElement("canvas");
      canvasCustom.width = bitmap.width
      canvasCustom.height = bitmap.height
      const context = canvasCustom.getContext('2d')
      context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
      const image = canvasCustom.toDataURL()

      // this turns the base 64 string to a [File] object
      const res = await fetch(image)
      const buff = await res.arrayBuffer()
      // clone so we can rename, and put into array for easy proccessing
      const file = [
         new File([buff], `photo_${new Date()}.jpg`, {
            type: 'image/jpeg',
         }),
      ]

      return image
   }

}