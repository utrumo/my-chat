export default class DelayCalculator {
  constructor(backoffFactor = 0.5, maxDelay = 8) {
    this._backoffFactor = backoffFactor;
    this._maxDelay = maxDelay;
    this._retryCount = 0;
  }

  getDelay() {
    const offerDelay = this._backoffFactor * (2 ** (this._retryCount - 1));
    const limitedDelay = offerDelay <= this._maxDelay ? offerDelay : this._maxDelay;
    const delayInMs = limitedDelay * 1000;
    this._retryCount += 1;
    return delayInMs;
  }

  increment() {
    this._retryCount += 1;
  }

  reset() {
    this._retryCount = 0;
  }
}
