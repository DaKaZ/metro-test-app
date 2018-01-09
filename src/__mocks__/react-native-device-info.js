const dPrime = jest.mock('react-native-device-info');
dPrime.isTablet = jest.fn();
export default dPrime;
