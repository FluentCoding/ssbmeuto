export const dayNames = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

export const CETDate = () => {
    var d = new Date();
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset() + 60) /* UTC+1 */;

    return d;
};

export const twoDigitFix = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
};

export const acp = 'nOfoeG1WY9YRgHZI';