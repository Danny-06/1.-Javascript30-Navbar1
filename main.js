import { getAllElementsMapWithId, getAllElementsMapWithDataJSAttribute } from './utilities-module.js'

const { appContent } = getAllElementsMapWithId()

const {
  productsBtnPc,
  productsPopupPc,

  productsBtnMobile,
  productsPopupMobile,
  closeProductPopupBtnMobile,

  hamburguerMenu,
  openHamburguerMenuBtn,
  closeHamburguerMenuBtn
} = getAllElementsMapWithDataJSAttribute()



productsBtnPc.addEventListener('click', handlePopupPC)
productsPopupPc.addEventListener('click', event => event.stopPropagation())

productsBtnMobile.addEventListener('click', handlePopupMobile)
productsPopupMobile.addEventListener('click', event => event.stopPropagation())


openHamburguerMenuBtn.addEventListener('click', event => {
  hamburguerMenu.classList.add('-show')
  appContent.hidden = true

  closeHamburguerMenuBtn.focus()
})
closeHamburguerMenuBtn.addEventListener('click', event => {
  hamburguerMenu.classList.remove('-show')
  appContent.hidden = false
})

closeProductPopupBtnMobile.addEventListener('click', event => productsPopupMobile.classList.remove('-show'))


function handlePopupPC(event) {
  if (!productsPopupPc.classList.toggle('-show')) {
    return
  }

  let avoidFirstClip = true
  const abortController = new AbortController()

  window.addEventListener('click', event => {
    if (avoidFirstClip) return avoidFirstClip = false
    if (event.target === productsBtnPc) return

    productsPopupPc.classList.remove('-show')

    abortController.abort()
  }, {signal: abortController.signal})
}


function handlePopupMobile(event) {
  productsPopupMobile.classList.add('-show')

  let avoidFirstClip = true
  const abortController = new AbortController()

  window.addEventListener('click', event => {
    if (avoidFirstClip) return avoidFirstClip = false
    if (event.target === productsBtnMobile) return

    productsPopupMobile.classList.remove('-show')

    abortController.abort()
  }, {signal: abortController.signal})
}
