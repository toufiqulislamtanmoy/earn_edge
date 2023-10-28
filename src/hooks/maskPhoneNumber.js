
const maskPhoneNumber = (phoneNumber) => {
    // Extract the first 5 digits
    const firstFiveDigits = phoneNumber.slice(0, 5);
    // Extract the last 2 digits
    const lastTwoDigits = phoneNumber.slice(-2);
    // Mask the middle digits with '*'
    const maskedMiddleDigits = '***';
    // Concatenate the masked parts
    const maskedPhoneNumber = `${firstFiveDigits}${maskedMiddleDigits}${lastTwoDigits}`;
    return maskedPhoneNumber;
};

export default maskPhoneNumber;