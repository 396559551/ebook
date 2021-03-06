export const FONT_SIZE_LIST = [
    {fontSize: 12 },
    {fontSize: 14 },
    {fontSize: 16 },
    {fontSize: 18 },
    {fontSize: 20 },
    {fontSize: 22 },
    {fontSize: 24 }
    //书本内容字号
]
export const FONT_FAMILY = [
    {font:'Default' },
    {font:'Cabin' },
    {font:'Days One' },
    {font:'Montserrat' },
    {font:'Tangerine' },
    //书本内容字号
]
//主题
export const THEME_LIST = [
    {
      // alias: vue.$t('book.themeDefault'),//别名，调用国际化没做
      name: 'Default',//存入ebook.js中的名称
      style: {
        body: {
          'color': '#4c5059',
          'background': '#cecece',
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        },
      //   img: {
      //     'width': '100%'
      //   },
      //   '.epubjs-hl': {
      //     'fill': 'red', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
      //   }
       }
    },
    {
      // alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          'color': '#5c5b56',
          'background': '#c6c2b6',
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        },
        // img: {
        //   'width': '100%'
        // },
        // '.epubjs-hl': {
        //   'fill': 'red', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
        // }
      }
    },
    {
      // alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          'color': '#404c42',
          'background': '#a9c1a9',
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        },
        // img: {
        //   'width': '100%'
        // },
        // '.epubjs-hl': {
        //   'fill': 'red', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
        // }
      }
    },
    {
      // alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          'color': '#cecece',
          'background': '#000000',
          // 'padding-top': `${realPx(48)}px!important`,
          // 'padding-bottom': `${realPx(48)}px!important`
        },
        // img: {
        //   'width': '100%'
        // },
        // '.epubjs-hl': {
        //   'fill': 'red', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
        // }
      }
    }
  ]
//主题之动态css
export function addCss(href) {
    const link = document.createElement('link');
    link.setAttribute('rel','stylesheet')
    link.setAttribute('type','text/css')
    link.setAttribute('href',href)
    document.getElementsByTagName('head')[0].appendChild(link);
}
export function removeCss(href) {
    const links =document.getElementsByTagName('link')
    for (let i = links.length; i >= 0 ;i--) {
        const link = links[i]
        if (link && link.getAttribute('href') && link.getAttribute('href')=== href)
            link.parentNode.removeChild(link)
    }
}
export function removeAllCss() {
    removeCss('${process.env.VUE_APP_RES_URL}/theme/theme_default.css')
    removeCss('${process.env.VUE_APP_RES_URL}/theme/theme_eye.css')
    removeCss('${process.env.VUE_APP_RES_URL}/theme/theme_gold.css')
    removeCss('${process.env.VUE_APP_RES_URL}/theme/theme_night.css')
}
//合并三级目录为一维数组
export function flatten(arr) {
    return [].concat(...arr.map(item => [].concat(item,...flatten(item.subitems))))
}