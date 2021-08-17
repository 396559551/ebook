import {mapGetters,mapActions} from "vuex";
import {addCss,removeAllCss, THEME_LIST} from "./book";
import {saveLocation} from "./localStorage";

export  const ebookMixin = {
    data() {
        return {
            themeList:THEME_LIST
        }
    },
    computed: {
        ...mapGetters(
            [   'fileName',
                'menuVisible',
                'settingVisible',
                'defaultFontSize',
                'currentBook',
                'defaultFontFamily',
                'fontFamilyVisible',
                'defaultTheme',
                'bookAvailable',
                'progress',
                'section',
                'cover',
                'metadata',
                'navigation',
                'offsetY',
                'isBookmark'
            ])
    },
    methods: {
        ...mapActions(
            [   'setfileName',
                'setmenuVisible',
                'setSetingVisible',
                'setDefaultFontSize',
                'setCurrentBook',
                'setDefaultFontFamily',
                'setFontFamilyVisible',
                'setDefaultTheme',
                'setBookAvailable',
                'setProgress',
                'setSection',
                'setCover',
                'setMetadata',
                'setNavigation',
                'setOffsetY',
                'setIsBookmark',

        ]),
        initGlobalStyle() {
            removeAllCss()
          switch (this.defaultTheme) {
            case 'Default':
              addCss('${process.env.VUE_APP_RES_URL}/theme/theme_default.css')
              break
            case 'Eye':
              addCss('${process.env.VUE_APP_RES_URL}/theme/theme_eye.css')
              break
            case 'Gold':
              addCss('${process.env.VUE_APP_RES_URL}/theme/theme_gold.css')
              break
            case 'Night':
              addCss('${process.env.VUE_APP_RES_URL}/theme/theme_night.css')
              break
            default:
              this.setDefaultTheme('Default')
              addCss('${process.env.VUE_APP_RES_URL}/theme/theme_default.css')
              break
            }
            },
        refreshLocation() {
          const currentLocation = this.currentBook.rendition.currentLocation()
            if (currentLocation && currentLocation.start) {
                const startCfi = currentLocation.start.cfi
                const progress = this.currentBook.locations.percentageFromCfi(startCfi)
                this.setProgress(Math.floor(progress * 100))
                this.setSection(currentLocation.start.index)
                saveLocation(this.fileName,startCfi)//localStorage中
            }

    },
        display(target,cb) {
            if (target) {
                return this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (cb) cb()
                })
            }
            else {
                 return this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                     if (cb) cb()
                })
            }

        },


    }
}