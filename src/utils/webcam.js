/**
 * Class to handle webcam
 */
export class Webcam {
  /**
   * Open webcam and stream it through video tag.
   * @param {HTMLVideoElement} videoRef video tag reference
   */
  open = async (videoRef) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        // If there are multiple video devices, prompt the user to select one
        const deviceId = videoDevices.length > 1 
          ? await this.selectDevice(videoDevices) 
          : videoDevices[0].deviceId;

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            deviceId: deviceId ? { exact: deviceId } : undefined,
            facingMode: "environment",
          },
        });

        videoRef.srcObject = stream;
      } catch (error) {
        alert("Can't open Webcam: " + error.message);
      }
    } else {
      alert("Can't open Webcam!");
    }
  };

  /**
   * Prompt the user to select a video device
   * @param {MediaDeviceInfo[]} videoDevices List of video input devices
   * @returns {Promise<string>} The deviceId of the selected device
   */
  selectDevice = (videoDevices) => {
    return new Promise((resolve) => {
      const selectionContainer = document.createElement('div');
      selectionContainer.style.position = 'fixed';
      selectionContainer.style.top = '0';
      selectionContainer.style.left = '0';
      selectionContainer.style.width = '100%';
      selectionContainer.style.height = '100%';
      selectionContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      selectionContainer.style.display = 'flex';
      selectionContainer.style.flexDirection = 'column';
      selectionContainer.style.alignItems = 'center';
      selectionContainer.style.justifyContent = 'center';

      videoDevices.forEach(device => {
        const button = document.createElement('button');
        button.innerText = device.label || `Camera ${videoDevices.indexOf(device) + 1}`;
        button.onclick = () => {
          document.body.removeChild(selectionContainer);
          resolve(device.deviceId);
        };
        selectionContainer.appendChild(button);
      });

      document.body.appendChild(selectionContainer);
    });
  };


  
  /**
   * Close opened webcam.
   * @param {HTMLVideoElement} videoRef video tag reference
   */
  close = (videoRef) => {
    if (videoRef.srcObject) {
      videoRef.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
      videoRef.srcObject = null;
    } else alert("Please open Webcam first!");
  };
}
