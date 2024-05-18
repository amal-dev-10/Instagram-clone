import moment from "moment";

export function isPhoneNumber(str: string): boolean {
    // Regular expression to match phone numbers in common formats
    const phoneRegex = /^\+?(\d{1,3})?[-. ]?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
    return phoneRegex.test(str);
}

export function isEmail(str: string): boolean {
    // Regular expression to match email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
}

export const setLocalStorage = async (data: {key: string, value: string}[])=>{
    let promises = data.map((x)=>{
        return localStorage.setItem(x.key, x.value);
    })

    await Promise.all(promises);
}

export function getDateDiffString(utcDateString: string): string {
    if(utcDateString){
        const utcDate = moment.utc(utcDateString);
        const currentDate = moment();
        const diffSeconds = currentDate.diff(utcDate, 'seconds');
        const diffMinutes = currentDate.diff(utcDate, 'minutes');
        const diffHours = currentDate.diff(utcDate, 'hours');
        const diffDays = currentDate.diff(utcDate, 'days');
        const diffWeeks = currentDate.diff(utcDate, 'weeks');
        const diffMonths = currentDate.diff(utcDate, 'months');
        const diffYears = currentDate.diff(utcDate, 'years');

        if (diffYears > 0) {
            return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
        } else if (diffMonths > 0) {
            return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
        } else if (diffWeeks > 0) {
            return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
        } else if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else {
            return `${diffSeconds} second${diffSeconds > 1 ? 's' : ''} ago`;
        }
    }else{
        return ""
    }
}