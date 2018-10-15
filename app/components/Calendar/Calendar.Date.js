const dotw = {
  en: { us: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
}

const dotws = {
  en: { us: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
}

class Calendar extends Date {
  constructor(date) {
    super(date)
    this.setJulianDate()
  }
  getJulianDate() {
    let jDate = 0
    // Leap Years
    if (Math.round(this.getFullYear() / 4) * 4 === this.getFullYear()) {
      switch (this.getMonth()) {
        case 0:
          jDate = this.getDate()
          break
        case 1:
          jDate = this.getDate() + 31
          break
        case 2:
          jDate = this.getDate() + 60
          break
        case 3:
          jDate = this.getDate() + 91
          break
        case 4:
          jDate = this.getDate() + 121
          break
        case 5:
          jDate = this.getDate() + 152
          break
        case 6:
          jDate = this.getDate() + 182
          break
        case 7:
          jDate = this.getDate() + 213
          break
        case 8:
          jDate = this.getDate() + 244
          break
        case 9:
          jDate = this.getDate() + 274
          break
        case 10:
          jDate = this.getDate() + 305
          break
        case 11:
          jDate = this.getDate() + 335
          break
        default:
          jDate = 0
          break
      }
    } else {
      // Regular Years
      switch (this.getMonth()) {
        case 0:
          jDate = this.getDate()
          break
        case 1:
          jDate = this.getDate() + 31
          break
        case 2:
          jDate = this.getDate() + 59
          break
        case 3:
          jDate = this.getDate() + 90
          break
        case 4:
          jDate = this.getDate() + 120
          break
        case 5:
          jDate = this.getDate() + 151
          break
        case 6:
          jDate = this.getDate() + 181
          break
        case 7:
          jDate = this.getDate() + 212
          break
        case 8:
          jDate = this.getDate() + 243
          break
        case 9:
          jDate = this.getDate() + 273
          break
        case 10:
          jDate = this.getDate() + 304
          break
        case 11:
          jDate = this.getDate() + 334
          break
        default:
          jDate = 0
          break
      }
    }
    return jDate
  }
  getDayOfTheWeek(languageCode, opt) {
    if (opt === 'short') {
      switch (languageCode) {
        case 'en-us':
        default:
          return dotws.en.us[this.getDay()]
      }
    } else {
      switch (languageCode) {
        case 'en-us':
        default:
          return dotw.en.us[this.getDay()]
      }
    }
  }
  generateMonth() {
    let i = 28
    switch (this.getMonth()) {
      case 0:
        i = 31
        break
      case 1:
        if (Math.round(this.getFullYear() / 4) * 4 === this.getFullYear()) {
          i = 29
        }
        break
      case 2:
        i = 31
        break
      case 3:
        i = 30
        break
      case 4:
        i = 31
        break
      case 5:
        i = 30
        break
      case 6:
        i = 31
        break
      case 7:
        i = 31
        break
      case 8:
        i = 30
        break
      case 9:
        i = 31
        break
      case 10:
        i = 30
        break
      case 11:
        i = 31
        break
      default:
        i = 0
        break
    }
    let l = 1
    const month = []
    const date = this
    date.setDate = 1
    for (let k = 0; l <= i; k++) {
      const week = []
      for (let j = 7; j >= 0; j--) {
        week[date.getDay()] = l
        l += 1
      }
      month[k] = week
    }
    return month
  }
}

export default Calendar
