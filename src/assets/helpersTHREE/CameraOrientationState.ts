

export default class CameraOrientationState {
  pitchAngle: number;
  yawAngle: number;
  startingPitchAngleForCurrentCoordinates: number;
  startingYawAngleForCurrentCoordinates: number;
  previousPitchAngle: number;
  previousYawAngle: number;
  lastMouseMoveTime: number;
  movementDuration: number;
  
  constructor() {
      this.pitchAngle = 0;
      this.yawAngle = 0;
      this.startingPitchAngleForCurrentCoordinates = 0;
      this.startingYawAngleForCurrentCoordinates = 0;
      this.previousPitchAngle = 0;
      this.previousYawAngle = 0;
      this.lastMouseMoveTime = 0;
      this.movementDuration = 70;
    }
  }