import { getAllElementsMapWithId, getAllElementsMapWithDataJSAttribute } from './utilities-module.js'

const { appContent } = getAllElementsMapWithId()

const {
  navList,

  productsBtnPc,
  productsPopupPc,

  productsBtnMobile,
  productsPopupMobile,
  closeProductPopupBtnMobile,

  hamburguerMenu,
  openHamburguerMenuBtn,
  closeHamburguerMenuBtn
} = getAllElementsMapWithDataJSAttribute()


// PC popup
productsBtnPc.addEventListener('click', handlePopupPCClick)
productsBtnPc.addEventListener('keyup', event => {
  if (event.code !== 'Space' && event.code !== 'Enter') return
  handlePopupPCClick(event)
})
productsPopupPc.addEventListener('click', event => event.stopPropagation())

productsPopupPc.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', event => {
    productsPopupPc.classList.remove('-show')
    document.documentElement.click()
  })
  item.addEventListener('keyup', event => {
    if (event.code !== 'Space' && event.code !== 'Enter') return

    event.stopPropagation()
    document.documentElement.click()
  })
})

navList.addEventListener('focusin', event => {
  if (event.composedPath().includes(productsPopupPc)) return

  productsPopupPc.classList.remove('-show')
})


// Mobile Popup
productsBtnMobile.addEventListener('click', handlePopupMobileClick)
productsBtnMobile.addEventListener('keyup', event => {
  if (event.code !== 'Space' && event.code !== 'Enter') return
  handlePopupMobileClick(event)
})
productsPopupMobile.addEventListener('click', event => event.stopPropagation())

productsPopupMobile.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', event => {
    productsPopupMobile.classList.remove('-show')
    document.documentElement.click()
  })
  item.addEventListener('keyup', event => {
    if (event.code !== 'Space' && event.code !== 'Enter') return

    event.stopPropagation()
    document.documentElement.click()
  })
})

hamburguerMenu.addEventListener('focusin', event => {
  if (event.composedPath().includes(productsPopupMobile)) return

  productsPopupPc.classList.remove('-show')
})

closeProductPopupBtnMobile.addEventListener('click', event => {
  productsPopupMobile.classList.remove('-show')
  document.documentElement.click()
})


// Hamburguer Menu
openHamburguerMenuBtn.addEventListener('click', event => {
  hamburguerMenu.classList.add('-show')

  hamburguerMenu.addEventListener('transitionend', event => appContent.hidden = true, {once: true})

  closeHamburguerMenuBtn.focus()
})

closeHamburguerMenuBtn.addEventListener('click', event => {
  hamburguerMenu.classList.remove('-show')
  appContent.hidden = false
})





function handlePopupPCClick(event) {
  if (!productsPopupPc.classList.toggle('-show')) {
    return
  }

  let avoidFirstClip = true
  const abortController = new AbortController()

  window.addEventListener('click', evt => {
    if (event.type === 'click' && avoidFirstClip) return avoidFirstClip = false

    productsPopupPc.classList.remove('-show')

    abortController.abort()
  }, {signal: abortController.signal})
}


function handlePopupMobileClick(event) {
  productsPopupMobile.classList.add('-show')

  productsPopupMobile.addEventListener('transitionend', event => {
    productsPopupMobile.querySelector('.item').focus()
  }, {once: true})

  let avoidFirstClip = true
  const abortController = new AbortController()

  window.addEventListener('click', evt => {
    if (event.type === 'click' && avoidFirstClip) return avoidFirstClip = false

    productsPopupMobile.classList.remove('-show')

    abortController.abort()
  }, {signal: abortController.signal})
}
