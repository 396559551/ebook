const book = {
    state: {
        //文件名
    fileName: '',
        //菜单是否隐藏
    menuVisible: false,
        //设置字体选项
    settingVisible: -1,//-1：不显示，0：字号，1：主题，2：进度条，3：目录
        //设置默认字体，可供其他组件引用
    defaultFontSize: 16,
        //当前书的对象
    currentBook: null,
        //传递自定义默认字体
    defaultFontFamily: 'Default',
        //自定义字体显示
    fontFamilyVisible: false,
        //默认主题设置
    defaultTheme: 'Default',
        //分页
    bookAvailable:false,
        //进度
    progress: 0,
        //章节
    section: 0,
        //封面
    cover:null,
        //书籍信息
    metadata: null,
        //目录结构信息
    navigation: null,
        //书签用，偏移量
    offsetY: 0,
        //判断是否为书签
    isBookmark: false,
  },
  mutations: {
    'SET_FILENAME': (state,fileName) => {
      state.fileName =fileName
    },
    'SET_MENUVISIBLE': (state,menuVisible) => {
      state.menuVisible =menuVisible
    },
    'SET_SETTINGVISIBLE': (state,settingVisible) => {
      state.settingVisible =settingVisible
    },
      'SET_DEFAULT_FONT_SIZE': (state,defaultFontSize) => {
      state.defaultFontSize =defaultFontSize
    },
      'SET_CURRENT_BOOK': (state,currentBook) => {
      state.currentBook =currentBook
    },
      'SET_DEFAULT_FONT_FAMILY': (state,defaultFontFamily) => {
      state.defaultFontFamily =defaultFontFamily
    },
      'SET_FONT_FAMILY_VISIBLE': (state,fontFamilyVisible) => {
      state.fontFamilyVisible =fontFamilyVisible
    },
      'SET_DEFAULT_THEME': (state,defaultTheme) => {
      state.defaultTheme =defaultTheme
    },
      'SET_BOOK_AVAILABLE': (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
      'SET_PROGRESS': (state, progress) => {
      state.progress = progress
    },
      'SET_SECTION': (state, section) => {
      state.section = section
    },
      'SET_COVER': (state, cover) => {
      state.cover = cover
    },
      'SET_METADATA': (state, metadata) => {
      state.metadata = metadata
    },
      'SET_NAVIGATION': (state, navigation) => {
      state.navigation = navigation
    },
      'SET_OFFSETY': (state, offsetY) => {
      state.offsetY = offsetY
    },
      'SET_IS_BOOKMARK': (state, isBookmark) => {
      state.isBookmark = isBookmark
    },
  },
//Actions在actions.js
//在getters，mixin分别加入
}
export default book