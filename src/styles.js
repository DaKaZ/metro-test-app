// Global style sheet
import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';

const {
  width: SCREEN_WIDTH,
  // eslint-disable-next-line no-unused-vars
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

// based on iphone 5s's scale
// eslint-disable-next-line no-unused-vars
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  }
  return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
}

export const Colors = {
  dhsBlue: '#003366',
  dhsGray: '#999999',
  dhsRed: '#cc3333',
  dhsGreen: '#669900',
  dhsLtBlue: '#006699',
  dhsLtGray: '#cccccc',
  dhsDrGray: '#666666',
  dhsDrGreen: '#006600',
  dhsBlack: '#000000',
  dhsWhite: '#ffffff',
  dhsOffWhite: '#F6F7F8',
  darkBackground: '#85a3bf',
  darkBlue: '#122E51',
  lightBackground: '#d2deec',
  lightBlue: '#205493',
  lightGrayBackground: '#F8F8F8',
  grayBackground: '#E0E0E0',
  darkGrayBackground: '#C7C7C7',
  darkForeground: '#0000000',
  lightForeground: '#ffffff',
  lightPrimary: '#CFE4FF',
  primary: '#336699',
  highlight: '#10ded7',
  transparentBlack: '#000A',
  transparent: 'transparent'
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerIcon: {
    marginLeft: 10,
    marginRight: 10,
    color: Colors.dhsWhite
  },
  square: {
    backgroundColor: Colors.dhsBlue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 60,
    paddingVertical: 20
  },
  textXXS: {
    fontSize: normalize(9)
  },
  textXS: {
    fontSize: normalize(12)
  },
  textS: {
    fontSize: normalize(15)
  },
  textM: {
    fontSize: normalize(17)
  },
  textL: {
    fontSize: normalize(20)
  },
  textXL: {
    fontSize: normalize(24)
  },
  textXXL: {
    fontSize: normalize(30)
  },
  navBarTitle: {
    fontSize: normalize(18),
    color: Colors.dhsWhite,
    fontFamily: 'Merriweather',
    fontWeight: 'bold'
  },
  navBar: {
    backgroundColor: Colors.darkBlue
  }
});

export default Styles;
