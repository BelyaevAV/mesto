export default class userInfo {
  constructor({name, job}) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    this._userCard = {
      name: this._name.textContent,
      job: this._job.textContent
    }
    return this._userCard;
  }

  setUserInfo(name,job) {
    this._name.textContent = name.value;
    this._job.textContent = job.value;
  }
}

