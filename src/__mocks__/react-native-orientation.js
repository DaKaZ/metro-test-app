const oPrime = {};
oPrime.orientation = 'PORTRAIT';
oPrime.getInitialOrientation = jest.fn(() => oPrime.orientation);
oPrime.addOrientationListener = jest.fn();
oPrime.removeOrientationListener = jest.fn();
oPrime.lockToPortrait = jest.fn();
// eslint-disable-next-line no-underscore-dangle
oPrime.__setOrientation = function (newOrientation = oPrime.orientation) {
  oPrime.orientation = newOrientation;
};

export default oPrime;
