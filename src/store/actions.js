const  actions = {
     //如果return 则返回的是一个promise
     setfileName: ({commit},fileName) => {
        return commit('SET_FILENAME',fileName)
     },
     setmenuVisible:({commit},menuVisible) => {
        return commit('SET_MENUVISIBLE',menuVisible)
     },
    setSetingVisible:({commit},settingVisible) => {
        return commit('SET_SETTINGVISIBLE',settingVisible)
     },
    setDefaultFontSize:({commit},defaultFontSize) => {
        return commit('SET_DEFAULT_FONT_SIZE',defaultFontSize)
     },
    setCurrentBook:({commit},currentBook) => {
        return commit('SET_CURRENT_BOOK',currentBook)
     },
    setDefaultFontFamily:({commit},defaultFontFamily) => {
        return commit('SET_DEFAULT_FONT_FAMILY',defaultFontFamily)
     },
    setFontFamilyVisible:({commit},fontFamilyVisible) => {
        return commit('SET_FONT_FAMILY_VISIBLE',fontFamilyVisible)
     },
    setDefaultTheme:({commit},defaultTheme) => {
        return commit('SET_DEFAULT_THEME',defaultTheme)
     },
    setBookAvailable: ({ commit }, bookAvailable) => {
        return commit('SET_BOOK_AVAILABLE', bookAvailable)
     },
    setProgress: ({ commit }, progress) => {
        return commit('SET_PROGRESS', progress)
     },
    setSection:({ commit }, section) => {
        return commit('SET_SECTION', section)
     },
    setCover: ({ commit }, cover) => {
    return commit('SET_COVER', cover)
  },
    setMetadata: ({ commit }, metadata) => {
    return commit('SET_METADATA', metadata)
  },
    setNavigation: ({ commit }, navigation) => {
    return commit('SET_NAVIGATION', navigation)
  },
    setOffsetY({ commit }, offsetY) {
    return commit('SET_OFFSETY', offsetY)
  },
    setIsBookmark({ commit }, isBookmark) {
    return commit('SET_IS_BOOKMARK', isBookmark)
  },
}

export default actions