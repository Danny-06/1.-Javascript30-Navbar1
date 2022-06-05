const { hamburguerMenuBtn, productsBtnPc, productsPopupPc } = getAllElementsMapWithDataJSAttribute()


hamburguerMenuBtn.addEventListener('click', event => {

})

productsBtnPc.addEventListener('click', event => {
  // Avoid the popup to dissapear if clicked directly on it except on its content
  if (event.target === productsPopupPc) return event.stopPropagation()

  if (event.target !== productsBtnPc) return
  if (productsPopupPc.classList.contains('-show')) return

  productsPopupPc.classList.add('-show')
  event.stopPropagation()
  window.addEventListener('click', event => productsPopupPc.classList.remove('-show'), {once: true})
})






/**
 * @param {Document | Element} node
 * @returns {{[key: string]: Element}}
 */
function getAllElementsMapWithDataJSAttribute(node = document) {
  const hyphenToLowerCase = string => string.split('-').map((str, index) => index !== 0 ? str[0].toUpperCase() + str.slice(1) : str).join('')

  if (node == null) throw new TypeError(`param 1 cannot be null or undefined`)
  if (!(node instanceof Element || node instanceof Document)) throw new TypeError(`param 1 must be an instance of Element or Document`)

  const elements = node.querySelectorAll('*')

  const map = {}

  elements.forEach(element => {
    const dataJSPrefix = 'data-js-'
    const attribute = [...element.attributes].filter(attribute => attribute.name.startsWith(dataJSPrefix))[0]

    if (attribute == null) return

    const name  = hyphenToLowerCase(attribute.name.slice(dataJSPrefix.length))

    if (name in map) throw new DOMException(`data attribute js must be unique`)

    map[name] = element
  })

  return map
}

