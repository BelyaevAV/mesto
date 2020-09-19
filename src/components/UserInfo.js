export default class userInfo {
  constructor({name, job}) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const userCard = {}
    userCard.name = this._name.textContent,
    userCard.job = this._job.textContent
    return userCard;
  }

  setUserInfo({name, job}) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}

